// app.js
var express = require( 'express' );
var app = express();

//. EJS テンプレートエンジン
app.set( 'views', __dirname + '/templates' );
app.set( 'view engine', 'ejs' );

//. / へのアクセスは正常にできる
app.get( '/', function( req, res ){
  res.render( 'index', {} );
});

//. /err へのアクセスは 505 エラーとする
app.get( '/err', function( req, res ){
  res.render( 'index', { value: novalue } ); //. novalue 変数が未定義なので 500 エラーが発生する
});

//. 有効なルーティングを上記に記述
//. /, /err 以外のパスは 404 エラー

//. 404 エラーが発生した場合、
app.use( function( req, res, next ){
  res.status( 404 ); //. 404 エラー
  res.render( 'err404', { path: req.path } ); //. 404 エラーが発生したパスをパラメータとして渡す
});

//. 500 エラーが発生した場合、
app.use( function( err, req, res, next ){
  res.status( 500 ); //. 500 エラー
  res.render( 'err500', { error: err } ); //. 500 エラーの内容をパラメータとして渡す
});

var port = 3000;
app.listen( port );
console.log( 'server started on ' + port );

