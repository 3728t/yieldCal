import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import chalk from 'chalk';


const timeStart = new Date();

const app = new Koa();
app.use(bodyParser());

const router = new Router();

router.get('/', async(ctx, next) => {
  ctx.response.body = `<h1>Index page</h1>`;
});

router.get('/home', async(ctx, next) => {
  console.log(ctx.request.query);
  console.log(ctx.request.querystring);
  ctx.response.body = '<h1>HOME page</h1>';
});

router.get('/home/:id/:name', async(ctx, next) => {
  console.log(ctx.params);
  ctx.response.body = `<h1>HOME page /:id/:name</h1>`;
});

router.get('/404', async(ctx, next) => {
  ctx.response.body = `<h1>404 Not Found</h1>`;
});

router.get('/user', async(ctx, next)=>{
  ctx.response.body =
    `
    <form action="/user/register" method="post">
      <input name="name" type="text" placeholder="请输入用户名：ikcamp"/> 
      <br/>
      <input name="password" type="text" placeholder="请输入密码：123456"/>
      <br/> 
      <button>GoGoGo</button>
    </form>
  `
});

router.post('/user/register', async(ctx, next) => {
  const { name, pwd } = ctx.request.body;
  const errMessage = 'Wrong login info';
  if (name === "ikcamp" && pwd === "123456") {
    ctx.response.body = `Hello, ${ name }! `;
  }else{
    ctx.response.body = errMessage;
  }
});

app.use(router.routes());

app.listen(3000, () => {
  console.log('server is running at ' + chalk.greenBright('http://localhost:3000'));
});