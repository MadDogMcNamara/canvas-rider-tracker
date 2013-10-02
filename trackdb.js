TrackDB = {
  // Constants
  __dbname: "tracks",
  __dbversion: "1.0",
  __dbdesc: "",
  __dbsize: 1024*1024*5, // 5MB
  // sql
  __sql_createtable: "CREATE TABLE IF NOT EXISTS tracks(tracknum INTEGER PRIMARY KEY ASC, completed TIMESTAMP DEFAULT NULL)",
  __sql_gettrack: "SELECT * FROM tracks WHERE tracknum = ?",
  __sql_addtrack: "INSERT INTO tracks (tracknum) VALUES (?)",
  __sql_completetrack: "UPDATE tracks SET completed = datetime() WHERE tracknum = ?",


  _db: null,

  _dberror: function(tx,err) {
    console.log(err);
  },

  _ensuredb: function() {
    var t = this;
    if (t._db == null) {
      t._db = openDatabase(t.__dbname, t.__dbversion, t.__dbdesc, t.__dbsize);
      t._db.transaction(function(tx){
        tx.executeSql(t.__sql_createtable,[],null,t._dberror);
      });
    }
  },

  getTrack: function(tracknum,cb) {
    var t = this;
    t._ensuredb();

    t._db.transaction(function(tx){
      tx.executeSql(t.__sql_gettrack,[tracknum],function(tx,rs){
        var res = 0;
        if (rs.rows.length > 0) {
          res = (rs.rows.item(0).completed != null) ? 2 : 1;
        } else {
          tx.executeSql(t.__sql_addtrack,[tracknum],null,t._dberror);
        }
        if (cb != null) {
          cb(res);
        }
      },t._dberror);
    });
  },

  completeTrack: function(tracknum,cb) {
    var t = this;
    t._ensuredb();

    t._db.transaction(function(tx){
      tx.executeSql(t.__sql_completetrack,[tracknum],function(tx){
        if (cb != null) {
          cb();
        }
      },t._dberror);
    });
  },
};
