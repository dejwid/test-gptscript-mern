import express from 'express';
import cors from 'cors';
import {GPTScript, RunEventType} from "@gptscript-ai/gptscript";
import uniqid from 'uniqid';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const g = new GPTScript();

async function gpt(file, params = {}) {
  let input = '';
  Object.keys(params).forEach((k) => input += `--${k} ${params[k]} `);
  console.log(file + ' ' + input);
  try{
    const run = await g.run('./gpt-scripts/'+file, {input, disableCache: true});
    run.on(RunEventType.Event, e => e.type === RunEventType.CallFinish && e.output && console.log(e.output));
    return await run.text();
  } catch (e) {
    console.error(e);
  }
}

app.get('/', async(req, res) => {
  fs.mkdirSync('./stories/'+uniqid(), {recursive:true});
  // return res.send('index '+uniqid());
});

app.get('/story', async(req, res) => {
  const id = uniqid();
  const dir = './stories/'+id;
  fs.mkdirSync(dir, {recursive:true});

  await gpt('story2.gpt', {dir, link: 'https://cointelegraph.com/news/bitcoin-mining-difficulty-hits-lowest-level-march-price-tops-57-k'});
  return res.json(dir);

  // return res.json(await gpt('story.gpt', {
  //   link: 'https://cointelegraph.com/news/bitcoin-mining-difficulty-hits-lowest-level-march-price-tops-57-k',
  //   dir: './stories/'+id,
  // }))
});

app.get('/tmp', async(req, res) => {
  const dir = './stories/t61p9rp9lycs2n9d';
  await gpt('tmp.gpt', {dir});
});

// app.post('/story', async(req, res) => {
//   return res.json(uniqid());
//   return res.json( await gpt('story.gpt', 'link', req.body.link) );
// });
//
// app.post('/texts', async (req, res) => {
//   return res.json( (await gpt('texts.gpt', 'link', req.body.link)).split('|||') );
// });
//
// app.post('/image', async (req, res) => {
//   return res.json( await gpt('image.gpt', 'text', req.body.text) );
// });
//
// app.post('/speech', async (req, res) => {
//   return res.json( await gpt('speech.gpt', 'text', req.body.text) );
// });

app.listen(8088, () => console.log('Listening on http://localhost:8088'));