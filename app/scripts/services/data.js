'use strict';

/**
 * @ngdoc service
 * @name lotoApp.Data
 * @description
 * # Data
 * Service in the lotoApp.
 */
angular.module('lotoApp')
  .service('lotoData', function ($http, $window, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var obj = {
      url: "http://loto7.jp.net/databases/xml?time=1&data=all",
      
      webdb: $window.openDatabase('lotodb', '', 'My Loto Database', 1024 * 1024 * 1),

      getData: function(loaded) {
          var self = this;
          
          try {
            self.webdb.transaction(function(tr){
              tr.executeSql("SELECT * FROM LOTODATA ORDER BY times, isBonus, num",
                            [],
                            function(tr, rs) {
                              var res = [];
                              jQuery.each(rs.rows, function(idx, row) {
                                res.push({
                                  times: row.times,
                                  num: row.num,
                                  isBonus: row.isBunus
                                });
                              });
                              if(loaded !== null){
                                loaded(true, res);
                              }
                            });
            });
          } catch (error) {
            if(loaded !== null){
              loaded(false, []);
            }            
          }
      },
       
      /* Webからデータを取得 */
      fetchData: function(loaded){
        var self = this;
        $window.jQuery.ajax({
          url: this.url,
          type: 'GET',
          dataType: 'xml',
          success: function(res) {
            var data = /<results>.*<\/results>/g.exec(res.responseText);
            var dom = jQuery.parseXML('<?xml version="1.0" encoding="utf-8"?>' + data);
            
            try {
              self.webdb.transaction(function(tr){
                tr.executeSql("DELETE FROM LOTODATA");
                jQuery.each(dom.querySelectorAll("results > times"), function(idx, item) {
                  var tms = item.getAttribute("no");
                  var nos = item.querySelector("main_number").textContent;
                  var nob = item.querySelector("bonus_number").textContent;
                  jQuery.each(nos.split(/\s+/), function(idx, no){
                    tr.executeSql("INSERT INTO LOTODATA VALUES(?,?,?)", [tms, no, false]);
                  });
                  jQuery.each(nob.split(/\s+/), function(idx, no) {
                    tr.executeSql("INSERT INTO LOTODATA VALUES(?,?,?)", [tms, no, true]);
                  });
                });
              });
              if ( loaded !== null){
                loaded(true);
              }
            } catch (error) {
              if ( loaded !== null){
                loaded(false);
              }
            }
          },
          error: function(res) {
              if ( loaded !== null){
                loaded(false);
              }
          }
        });
      },
      
      init: function() {
        if(this.webdb !== null) {
          var db = this.webdb;
          db.transaction(function(tr) {
              tr.executeSql('CREATE TABLE IF NOT EXISTS LOTODATA(times integer not null, num integer not null, isbonus boolean not null)');
          });
        }
      },
    };
    
    obj.init();
    
    return obj;
  });
