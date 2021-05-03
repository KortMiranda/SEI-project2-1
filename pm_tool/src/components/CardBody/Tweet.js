import React,{useState,useEffect} from 'react';
import ReactCountryFlag from "react-country-flag"
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios'

function Tweet({id,text, lang, tweetAnalysis, index}) {
    let [tweetText, setTweetText]= useState([])
    let [emotions, setEmotions] = useState([])
    let [translation, setTranslation] = useState('')
    let [tweetStrongestEmotion, setTweetStrongestEmotion] = useState();
    let [color,setColor] = useState();
    let [sentenceEmotionText, setSentenceEmotion] = useState();

    const showEmotion=(e)=>{
        if(e.target.className==='Joy' ||
            e.target.className==='Anger'||
            e.target.className==='Disgust'||
            e.target.className==='Sadness'||
            e.target.className==='Fear' ){
                setSentenceEmotion(e.target.className)
        }
        let sentenceEmotion = document.getElementById('sentenceEmotion')
        sentenceEmotion.style.display= 'block'
    }

    const hideEmotion=(e)=>{
        setSentenceEmotion('Neutral')
        let sentenceEmotion = document.getElementById('sentenceEmotion')
        sentenceEmotion.style.display= 'none'
    }

    const onMouseMove = (e) =>{
        let sentenceEmotion = document.getElementById('sentenceEmotion')
        sentenceEmotion.innerText= sentenceEmotionText
        sentenceEmotion.style.left = (e.clientX)+ 'px';
        sentenceEmotion.style.top = (e.clientY) + 'px';
    }
    document.querySelector('#tweetBoard').addEventListener('mousemove',onMouseMove)
    
    const translate=(e)=>{
        const keyword = e.target.innerText
        console.log('hi')
        axios.get(`/translate?keyword=${keyword}&lang=${lang}`)
        .then(res=>res.data)
        .then(data=>data[0])
        .then(data=>data.translations[0])
        .then(translations=>translations.text)
        .then(text=>setSentenceEmotion(text))
        console.log(e.target.querySelector('.translation'))
    }


    const getColor =(emotion, opacity) =>{
        if(emotion=== 'Joy'){return `rgba(245,181,15,${opacity})` }
        if(emotion=== 'Anger'){return `rgba(234,67,42,${opacity})`}
        if(emotion=== 'Disgust'){return `rgba(0,105,108,${opacity})`}
        if(emotion=== 'Sadness'){return `rgba(3,154,68,${opacity})`}
        if(emotion=== 'Fear'){return `rgba(92,78,60,${opacity})`}
        return ''
    }

    useEffect(()=>{
        if(JSON.stringify(tweetAnalysis) !=='[]' && tweetAnalysis!==undefined){
            let newTweetAnalysis = Array.from(tweetAnalysis);
            let newText = text;
            let item = newTweetAnalysis[index]
                if(item['sentences_tone']!==undefined){
                    let strongestEmotionInDocument = 'Neutral';
                    let strongestEmotionScoreInDocument = 0;
                    item['sentences_tone'].forEach((word)=>{//['result']needed
                        if(word['text'].length>1){
                            let wordStart = newText.indexOf(word['text'])
                            let wordEnd = wordStart+ word['text'].length
                            let wordFront = newText.slice(0,wordStart)
                            let wordMiddle = newText.slice(wordStart, wordEnd)
                            let wordBehind = newText.slice(wordEnd)
                            let emotions = [];
                            let strongestEmotion = 'Neutral';
                            let strongestEmotionScore = 0;
                            if(word['tone_categories'][0]!==undefined){
                                word['tone_categories'][0]['tones'].forEach((emotion)=>{
                                    if(emotion.score>0){
                                        emotions.push(emotion['tone_name'])
                                    }
                                    if(emotion.score>strongestEmotionScore){
                                        strongestEmotion = emotion['tone_name']
                                        strongestEmotionScore = emotion['score']
                                    }
                                    if(emotion.score>strongestEmotionScoreInDocument){
                                        strongestEmotionInDocument = emotion['tone_name']
                                        strongestEmotionScoreInDocument = emotion['score']
                                    }
                                })
                            }
                            newText = `${wordFront}<span class="${strongestEmotion}" style=
                                "background-color: ${getColor(strongestEmotion,strongestEmotionScore)}
                                ">${wordMiddle}</span>${wordBehind}`
                            }
                            
                    })
                    setColor(getColor(strongestEmotionInDocument,strongestEmotionScoreInDocument))
                    setTweetStrongestEmotion(strongestEmotionInDocument)
                }
            setTweetText(newText)
        }
    },[tweetAnalysis])

    let langToCountry ={
        "aa": "dj",
        "af": "za",
        "ak": "gh",
        "sq": "al",
        "am": "et",
        "ar": "aa",
        "hy": "am",
        "ay": "wh",
        "az": "az",
        "bm": "ml",
        "be": "by",
        "bn": "bd",
        "bi": "vu",
        "bs": "ba",
        "bg": "bg",
        "my": "mm",
        "ca": "ad",
        "zh": "cn",
        "hr": "hr",
        "cs": "cz",
        "da": "dk",
        "dv": "mv",
        "nl": "nl",
        "dz": "bt",
        "en": "gb",
        "et": "ee",
        "ee": "ew",
        "fj": "fj",
        "fil": "ph",
        "fi": "fi",
        "fr": "fr",
        "ff": "ff",
        "gaa": "gh",
        "ka": "ge",
        "de": "de",
        "el": "gr",
        "gn": "gx",
        "gu": "in",
        "ht": "ht",
        "ha": "ha",
        "he": "il",
        "hi": "in",
        "ho": "pg",
        "hu": "hu",
        "is": "is",
        "ig": "ng",
        "id": "id",
        "in":"in",
        "ga": "ie",
        "it": "it",
        "ja": "jp",
        "kr": "ne",
        "kk": "kz",
        "km": "kh",
        "kmb": "ao",
        "rw": "rw",
        "kg": "cg",
        "ko": "kr",
        "kj": "ao",
        "ku": "iq",
        "ky": "kg",
        "lo": "la",
        "la": "va",
        "lv": "lv",
        "ln": "cg",
        "lt": "lt",
        "lu": "cd",
        "lb": "lu",
        "mk": "mk",
        "mg": "mg",
        "ms": "my",
        "mt": "mt",
        "mi": "nz",
        "mh": "mh",
        "mn": "mn",
        "mos": "bf",
        "ne": "np",
        "nd": "zw",
        "nso": "za",
        "no": "no",
        "nb": "no",
        "nn": "no",
        "ny": "mw",
        "pap": "aw",
        "ps": "af",
        "fa": "ir",
        "pl": "pl",
        "pt": "pt",
        "pa": "in",
        "qu": "wh",
        "ro": "ro",
        "rm": "ch",
        "rn": "bi",
        "ru": "ru",
        "sg": "cf",
        "sr": "rs",
        "srr": "sn",
        "sn": "zw",
        "si": "lk",
        "sk": "sk",
        "sl": "si",
        "so": "so",
        "snk": "sn",
        "nr": "za",
        "st": "ls",
        "es": "es",
        "sw": "sw",
        "ss": "sz",
        "sv": "se",
        "tl": "ph",
        "tg": "tj",
        "ta": "lk",
        "te": "in",
        "tet": "tl",
        "th": "th",
        "ti": "er",
        "tpi": "pg",
        "ts": "za",
        "tn": "bw",
        "tr": "tr",
        "tk": "tm",
        "uk": "ua",
        "umb": "ao",
        "ur": "pk",
        "uz": "uz",
        "ve": "za",
        "vi": "vn",
        "cy": "gb",
        "wo": "sn",
        "xh": "za",
        "yo": "yo",
        "zu": "za"
    }

    return (
        <>  
            <div className="tweetHeader">
            <span><ReactCountryFlag countryCode={langToCountry[lang]} /><h3>{id}</h3></span>
            <div className="flex items-center">
                <div className='emotionTag' style={{
                    backgroundColor: color
                }}></div>
                <div className='emotionLabel'>{(tweetStrongestEmotion===undefined)?'Neutral':tweetStrongestEmotion}</div>
            </div>
            </div>
            <div className ='tweetBody'>
                <p onMouseOver={showEmotion} onMouseLeave={hideEmotion} onClick={translate}>{ReactHtmlParser(tweetText)}</p>
            </div>
            {/* <div className='translation'>{translation}</div> */}
        </>
    );
}

export default Tweet;