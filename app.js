var app = express();

app.use(express.static('public'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 60633);

app.listen(app.port, function() {
    console.log(`listening on port ${app.port}!`)
});
