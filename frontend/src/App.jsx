import {useState} from 'react';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export default function App() {
  const [url, setUrl] = useState('');
  const [texts, setTexts] = useState([]);
  const [images, setImages] = useState([]);
  const [voiceover, setVoiceover] = useState('');

  async function fetchTexts() {
    const response = await axios.post('/texts', {link: url});
    setTexts(response.data);
  }
  async function fetchImage(text, index) {
    console.log('waiting for the image');
    const response = await axios.post('/image', {text});
    setImages(oldImages => {
      const newImages = [...oldImages];
      newImages[index] = response.data;
      console.log({response,oldImages,newImages});
      return newImages;
    });
  }
  async function fetchSpeech(text) {
    const response = await axios.post('/speech', {text});
    setVoiceover(response.data);
  }
  async function buildVideo() {

  }
  return (
    <>
      <main className="p-4 flex flex-col gap-2">
        <div className="flex gap-2 bg-gray-200 p-4">
          <input type="url" placeholder="url" value={url} onChange={ev => setUrl(ev.target.value)} />
          <button type="button" onClick={fetchTexts}>send</button>{url}
        </div>
        <div className="bg-gray-200 p-4 flex gap-8">
          {texts.length === 0 && "No texts yet"}
          {texts.length > 0 && texts.map((text,textIndex) => (
            <div className="flex gap-2">
              <textarea className="border p-2">{text}</textarea>
              <div>
                {!images?.[textIndex] && "No image yet"}
                {images?.[textIndex] && (
                  <img className="h-64 mb-2" src={images?.[textIndex]} alt=""/>
                )}
                <div className="text-center">
                  <button type="button" onClick={() => fetchImage(text, textIndex)}>
                    generate image
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-200 p-4">
          {!voiceover && (
            <div>
              <div>no voiceover yet</div>
            </div>
          )}
          <button onClick={() => fetchSpeech(texts.join(' '))}>generate</button>
          {voiceover && (
            <audio src={voiceover}/>
          )}
        </div>
      </main>
    </>
  )
}

