import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, BookOpen, Search, MousePointerClick, Image as ImageIcon, 
  LayoutGrid, Star, Palette, Trophy, Download, CheckCircle, 
  XCircle, ChevronRight, Lock, X, Eraser, PenTool, Stamp
} from 'lucide-react';

export default function App() {
  const [gameState, setGameState] = useState({
    currentView: 'splash', // splash, dataEntry, menu, level
    currentLevel: 0,
    unlockedLevels: [1],
    score: 0,
    lives: 3,
    studentName: '',
    studentClass: ''
  });

  const [feedbackMsg, setFeedbackMsg] = useState(null);
  const feedbackTimer = useRef(null);

  useEffect(() => {
    document.title = "Unsur dan Prinsip Seni Rupa - Media Pembelajaran";

    const setMetaTag = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    setMetaTag('description', 'Media pembelajaran interaktif Seni Rupa Kelas 5 SD. Belajar unsur dan prinsip seni rupa menjadi lebih menyenangkan!');
    setMetaTag('keywords', 'seni rupa, media pembelajaran, interaktif, kelas 5, unsur seni, prinsip seni, SD');
    
    // Open Graph / Social Media
    setMetaTag('og:title', 'Unsur dan Prinsip Seni Rupa', true);
    setMetaTag('og:description', 'Mari belajar unsur dan prinsip seni rupa di sekitar kita dengan game edukatif interaktif!', true);
    setMetaTag('og:type', 'website', true);
  }, []);

  // Otomatis Scroll ke atas saat pindah view atau level
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [gameState.currentView, gameState.currentLevel]);

  const showFeedback = (text, type = 'success') => {
    setFeedbackMsg({ text, type });
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    // Notifikasi hilang otomatis dalam 3 detik
    feedbackTimer.current = setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const closeFeedback = () => {
    setFeedbackMsg(null);
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
  };

  const handleCorrectAnswer = (points, msg) => {
    setGameState(prev => ({ ...prev, score: prev.score + points }));
    showFeedback(msg || 'Benar! Hebat sekali!', 'success');
  };

  const handleWrongAnswer = (msg) => {
    setGameState(prev => ({ 
      ...prev, 
      score: Math.max(0, prev.score - 2),
      lives: Math.max(0, prev.lives - 1)
    }));
    showFeedback(msg || 'Oops, masih kurang tepat. Coba lagi!', 'error');
  };

  const unlockNextLevel = (currentLevelId) => {
    setGameState(prev => {
      const nextLevel = currentLevelId + 1;
      const newUnlocked = prev.unlockedLevels.includes(nextLevel) 
        ? prev.unlockedLevels 
        : [...prev.unlockedLevels, nextLevel];
      return { ...prev, unlockedLevels: newUnlocked, score: prev.score + 20 };
    });
  };

  const goToMenu = () => setGameState(prev => ({ ...prev, currentView: 'menu' }));

  const Level1 = () => (
    <div className="space-y-6 animate-fade-in font-inter">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
          <BookOpen className="mr-2 text-blue-500" />
          Materi : Kenali Unsur Rupa
        </h3>
        <p className="text-slate-600 mb-4">Segala sesuatu yang kita lihat di sekitar kita, tersusun dari bagian-bagian kecil yang disebut unsur seni rupa. Mari kita amati!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 hover:shadow-md transition-shadow">
            <div className="text-5xl mb-3">🌲</div>
            <h4 className="font-bold text-blue-800 text-lg">Batang Pohon</h4>
            <p className="text-sm text-blue-600 mt-1">Memiliki unsur <strong>Garis</strong> vertikal dan <strong>Tekstur</strong> kasar.</p>
          </div>
          <div className="p-4 bg-green-50 rounded-xl border border-green-100 hover:shadow-md transition-shadow">
            <div className="text-5xl mb-3">🍃</div>
            <h4 className="font-bold text-green-800 text-lg">Daun</h4>
            <p className="text-sm text-green-600 mt-1">Memiliki unsur <strong>Warna</strong> hijau dan <strong>Bentuk</strong> oval.</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100 hover:shadow-md transition-shadow">
            <div className="text-5xl mb-3">⚽</div>
            <h4 className="font-bold text-yellow-800 text-lg">Bola</h4>
            <p className="text-sm text-yellow-600 mt-1">Memiliki unsur <strong>Bentuk</strong> bulat dan <strong>Ruang</strong> (volume 3D).</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 hover:shadow-md transition-shadow">
            <div className="text-5xl mb-3">🪟</div>
            <h4 className="font-bold text-purple-800 text-lg">Jendela</h4>
            <p className="text-sm text-purple-600 mt-1">Memiliki unsur <strong>Bidang</strong> persegi.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const Level2 = () => {
    const items = [
      { id: '1', label: 'Garis', img: '🌲', target: 'Batang Pohon' },
      { id: '2', label: 'Warna', img: '🍃', target: 'Daun' },
      { id: '3', label: 'Tekstur', img: '🪨', target: 'Batu' },
      { id: '4', label: 'Bidang', img: '🪟', target: 'Jendela' },
      { id: '5', label: 'Bentuk', img: '⚽', target: 'Bola' },
    ];
    
    const [selectedLabel, setSelectedLabel] = useState(null);
    const [matches, setMatches] = useState([]);

    const handleLabelClick = (label) => setSelectedLabel(label);
    const handleTargetClick = (target) => {
      if (!selectedLabel) return showFeedback('Pilih label di bawah terlebih dahulu!', 'error');
      
      const isMatch = items.find(i => i.label === selectedLabel && i.target === target);
      if (isMatch) {
        if (!matches.includes(target)) {
          setMatches([...matches, target]);
          handleCorrectAnswer(10, `Tepat! ${target} memiliki unsur ${selectedLabel}.`);
          setSelectedLabel(null);
        }
      } else {
        handleWrongAnswer(`Kurang tepat. Coba perhatikan lagi unsur utama pada ${target}.`);
        setSelectedLabel(null);
      }
    };

    return (
      <div className="space-y-6 font-inter">
        <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
          <p className="text-center text-green-800 mb-6 font-medium">Ketuk objek yang sesuai dengan label unsur yang kamu pilih.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {items.map((item) => {
              const isMatched = matches.includes(item.target);
              return (
                <button
                  key={item.id}
                  onClick={() => handleTargetClick(item.target)}
                  className={`w-32 h-36 flex flex-col items-center justify-center rounded-xl bg-white shadow-sm border-2 transition-all ${isMatched ? 'border-green-500 opacity-50 cursor-default' : 'border-slate-200 hover:border-blue-400 hover:scale-105 active:scale-95'}`}
                  disabled={isMatched}
                >
                  <span className="text-6xl mb-3">{item.img}</span>
                  <span className="text-sm font-semibold text-slate-700">{item.target}</span>
                  {isMatched && <CheckCircle className="absolute text-green-500 w-10 h-10 opacity-90 drop-shadow-md" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-wrap justify-center gap-3">
          {items.map((item) => {
            const isUsed = matches.includes(item.target);
            return (
              <button
                key={`lbl-${item.id}`}
                onClick={() => handleLabelClick(item.label)}
                disabled={isUsed}
                className={`px-6 py-3 rounded-xl border-2 font-bold transition-all text-sm md:text-base ${isUsed ? 'bg-slate-100 text-slate-400 border-slate-200' : selectedLabel === item.label ? 'bg-blue-600 text-white border-blue-600 shadow-md transform -translate-y-1' : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'}`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const Level3 = () => {
    const cards = [
      { id: 1, type: 'unsur', content: 'Bidang', pairId: 'A' },
      { id: 2, type: 'benda', content: 'Buku Tulis', pairId: 'A' },
      { id: 3, type: 'unsur', content: 'Bentuk', pairId: 'B' },
      { id: 4, type: 'benda', content: 'Bola Basket', pairId: 'B' },
      { id: 5, type: 'unsur', content: 'Garis', pairId: 'C' },
      { id: 6, type: 'benda', content: 'Pagar Kayu', pairId: 'C' },
      { id: 7, type: 'unsur', content: 'Warna', pairId: 'D' },
      { id: 8, type: 'benda', content: 'Pelangi', pairId: 'D' },
    ];

    const [shuffledCards] = useState(() => [...cards].sort(() => Math.random() - 0.5));
    const [selected, setSelected] = useState([]);
    const [matched, setMatched] = useState([]);

    const handleCardClick = (card) => {
      if (selected.length === 2 || matched.includes(card.pairId) || selected.find(c => c.id === card.id)) return;

      const newSelected = [...selected, card];
      setSelected(newSelected);

      if (newSelected.length === 2) {
        if (newSelected[0].pairId === newSelected[1].pairId) {
          setTimeout(() => {
            setMatched([...matched, newSelected[0].pairId]);
            setSelected([]);
            handleCorrectAnswer(15, 'Cocok! Pasangan yang tepat.');
          }, 800);
        } else {
          setTimeout(() => {
            setSelected([]);
            handleWrongAnswer('Hmm, kartu tidak cocok. Coba lagi!');
          }, 1000);
        }
      }
    };

    return (
      <div className="font-inter">
        <p className="text-slate-600 mb-6 text-center font-medium">Cari dan pasangkan kartu <strong>Unsur</strong> dengan <strong>Contoh Benda</strong> yang sesuai!</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {shuffledCards.map(card => {
            const isSelected = selected.find(c => c.id === card.id);
            const isMatched = matched.includes(card.pairId);
            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(card)}
                disabled={isMatched}
                className={`p-4 rounded-xl border-2 h-36 flex flex-col items-center justify-center transition-all ${
                  isMatched ? 'bg-green-100 border-green-300 opacity-50 scale-95' :
                  isSelected ? 'bg-blue-100 border-blue-500 shadow-lg scale-105' :
                  'bg-white border-slate-200 hover:border-blue-300 shadow-sm'
                }`}
              >
                <span className="text-xs font-bold text-slate-400 mb-3 tracking-widest uppercase">{card.type}</span>
                <span className={`font-black text-xl text-center leading-tight ${isMatched ? 'text-green-800' : 'text-slate-700'}`}>
                  {card.content}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const Level4 = () => {
    const questions = [
      { q: "Unsur seni rupa apa yang paling dominan pada permukaan batang pohon yang kasar?", img: "🌲", opts: ["Warna", "Tekstur", "Titik", "Ruang"], a: "Tekstur" },
      { q: "Bola sepak merupakan contoh dari unsur...", img: "⚽", opts: ["Bentuk", "Garis", "Titik", "Bidang"], a: "Bentuk" },
      { q: "Kertas gambar dan jendela adalah contoh dari unsur...", img: "🪟", opts: ["Warna", "Bidang", "Tekstur", "Titik"], a: "Bidang" }
    ];
    const [qIndex, setQIndex] = useState(0);

    if (qIndex >= questions.length) {
      return (
        <div className="text-center p-10 bg-green-50 rounded-2xl border border-green-100 font-inter animate-fade-in">
          <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-6 drop-shadow-md" />
          <h3 className="text-3xl font-black text-green-800 mb-2">Kuis Selesai!</h3>
          <p className="text-green-600 font-medium text-lg">Kamu berhasil menjawab semua pertanyaan.</p>
        </div>
      );
    }

    const current = questions[qIndex];

    return (
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 font-inter">
        <div className="text-[180px] leading-none text-center mb-8 drop-shadow-xl animate-fade-in">{current.img}</div>
        <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center px-4 leading-relaxed">{current.q}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {current.opts.map(opt => (
            <button
              key={opt}
              onClick={() => {
                if (opt === current.a) {
                  handleCorrectAnswer(15, 'Jawaban tepat!');
                  setTimeout(() => setQIndex(qIndex + 1), 1000);
                } else {
                  handleWrongAnswer();
                }
              }}
              className="p-5 rounded-xl border-2 border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-400 hover:shadow-md transition-all font-bold text-slate-700 text-lg text-left"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const Level5 = () => {
    const [composition, setComposition] = useState([]);
    const shapes = [
      { id: 's1', icon: '🟥', name: 'Persegi' },
      { id: 's2', icon: '🟡', name: 'Lingkaran' },
      { id: 's3', icon: '🔺', name: 'Segitiga' },
      { id: 's4', icon: '⭐', name: 'Bintang' }
    ];

    const addShape = (shape) => {
      if (composition.length < 8) {
        setComposition([...composition, shape]);
      }
    };

    const checkComposition = () => {
      if (composition.length >= 3) {
        handleCorrectAnswer(15, 'Karya seni yang indah! Komposisimu sangat menarik.');
      } else {
        showFeedback('Tambahkan minimal 3 bentuk untuk membuat komposisi seni.', 'error');
      }
    };

    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6 font-inter">
        <div className="text-center">
          <h3 className="text-xl font-bold text-slate-800">Susun Komposisi Seni</h3>
          <p className="text-slate-600 text-sm mt-2">Ketuk bentuk di bawah untuk menyusunnya ke dalam kanvas.</p>
        </div>

        <div className="flex justify-center gap-4 mb-4">
          {shapes.map(s => (
            <button key={s.id} onClick={() => addShape(s.icon)} className="text-5xl p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border-2 border-slate-200 hover:border-blue-300 transition-transform active:scale-95 shadow-sm">
              {s.icon}
            </button>
          ))}
        </div>

        <div className="h-64 bg-slate-50 rounded-2xl border-4 border-dashed border-slate-300 flex flex-wrap items-center justify-center p-6 gap-3 overflow-hidden relative shadow-inner">
          {composition.length === 0 && <span className="text-slate-400 font-medium absolute">Kanvas masih kosong</span>}
          {composition.map((icon, idx) => (
            <span key={idx} className="text-6xl animate-fade-in hover:scale-110 cursor-default transition-transform drop-shadow-md" style={{ transform: `rotate(${Math.random() * 40 - 20}deg)` }}>
              {icon}
            </span>
          ))}
        </div>

        <div className="flex justify-between gap-4 mt-8">
          <button onClick={() => setComposition([])} className="px-6 py-4 bg-slate-200 text-slate-700 font-bold rounded-xl flex-1 hover:bg-slate-300 transition-colors">
            Hapus Semua
          </button>
          <button onClick={checkComposition} className="px-6 py-4 bg-green-500 text-white font-bold rounded-xl flex-1 hover:bg-green-600 shadow-md hover:shadow-lg transition-all">
            Selesai Menyusun
          </button>
        </div>
      </div>
    );
  };

  const Level6 = () => {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 font-inter">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-3">Kenali Prinsip Keseimbangan</h3>
          <p className="text-slate-600 font-medium">Pilih gambar di bawah ini yang menunjukkan prinsip <strong>Keseimbangan Simetris</strong> (bentuk seimbang antara kiri dan kanan).</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button 
            onClick={() => handleWrongAnswer('Gambar ini berat sebelah (Asimetris). Coba cari yang seimbang kiri dan kanannya.')}
            className="p-10 border-4 border-slate-200 rounded-3xl hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center justify-center gap-8 group shadow-sm hover:shadow-md"
          >
            <div className="text-7xl group-hover:scale-110 transition-transform">🍎</div>
            <div className="text-4xl group-hover:scale-110 transition-transform">🍇</div>
          </button>

          <button 
            onClick={() => handleCorrectAnswer(15, 'Tepat Sekali! Gambar ini memiliki keseimbangan simetris.')}
            className="p-10 border-4 border-slate-200 rounded-3xl hover:border-green-400 hover:bg-green-50 transition-all flex items-center justify-center gap-12 group shadow-sm hover:shadow-md"
          >
            <div className="text-7xl group-hover:scale-110 transition-transform">🦋</div>
            <div className="text-7xl group-hover:scale-110 transition-transform">🦋</div>
          </button>
        </div>
      </div>
    );
  };

  const Level7 = () => {
    const [color1, setColor1] = useState(null);
    const [color2, setColor2] = useState(null);
    const [result, setResult] = useState(null);

    const colors = [
      { id: 'red', name: 'Merah', hex: '#ef4444' },
      { id: 'yellow', name: 'Kuning', hex: '#eab308' },
      { id: 'blue', name: 'Biru', hex: '#3b82f6' }
    ];

    const mixColors = (c1, c2) => {
      if (!c1 || !c2) return null;
      const mix = [c1, c2].sort().join('-');
      if (mix === 'red-yellow') return { name: 'Oranye', hex: '#f97316' };
      if (mix === 'blue-yellow') return { name: 'Hijau', hex: '#22c55e' };
      if (mix === 'blue-red') return { name: 'Ungu', hex: '#a855f7' };
      if (mix === 'blue-blue' || mix === 'red-red' || mix === 'yellow-yellow') return colors.find(c => c.id === c1);
      return { name: 'Cokelat', hex: '#78350f' };
    };

    useEffect(() => {
      if (color1 && color2) {
        const res = mixColors(color1, color2);
        setResult(res);
        if (res.name !== 'Merah' && res.name !== 'Kuning' && res.name !== 'Biru') {
          setTimeout(() => {
            showFeedback(`Berhasil membuat warna ${res.name}!`, 'success');
          }, 1500);
        }
      }
    }, [color1, color2]);

    const handleColorPick = (c) => {
      if (!color1) setColor1(c.id);
      else if (!color2) setColor2(c.id);
      else {
        setColor1(c.id);
        setColor2(null);
        setResult(null);
      }
    };

    return (
      <div className="space-y-8 text-center font-inter bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
        <p className="text-slate-600 font-bold text-lg">Pilih dua warna primer untuk dicampur!</p>
        <div className="flex justify-center gap-6 mb-8">
          {colors.map(c => (
            <button
              key={c.id}
              onClick={() => handleColorPick(c)}
              className="w-20 h-20 rounded-full shadow-lg border-4 border-white transition-transform hover:scale-110 active:scale-95"
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
        </div>
        
        <div className="flex items-center justify-center gap-6">
          <div className="w-28 h-28 rounded-2xl border-4 border-dashed border-slate-300 flex items-center justify-center shadow-inner transition-colors duration-500" style={{ backgroundColor: color1 ? colors.find(c=>c.id === color1).hex : 'transparent' }}>
            {!color1 && <span className="text-slate-400 font-medium">Warna 1</span>}
          </div>
          <span className="text-4xl text-slate-400 font-black">+</span>
          <div className="w-28 h-28 rounded-2xl border-4 border-dashed border-slate-300 flex items-center justify-center shadow-inner transition-colors duration-500" style={{ backgroundColor: color2 ? colors.find(c=>c.id === color2).hex : 'transparent' }}>
            {!color2 && <span className="text-slate-400 font-medium">Warna 2</span>}
          </div>
          <span className="text-4xl text-slate-400 font-black">=</span>
          <div className="w-40 h-40 rounded-[2rem] border-4 border-slate-200 flex flex-col items-center justify-center shadow-xl transition-all duration-700" style={{ backgroundColor: result ? result.hex : 'transparent', transform: result ? 'scale(1.05)' : 'scale(1)' }}>
            {!result && <span className="text-slate-400 font-medium">Hasil</span>}
            {result && <span className="text-white font-black text-xl tracking-wider drop-shadow-md animate-fade-in">{result.name}</span>}
          </div>
        </div>
        <button onClick={() => {setColor1(null); setColor2(null); setResult(null);}} className="mt-8 px-6 py-3 bg-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-300 transition-colors">Reset Campuran</button>
      </div>
    );
  };

  const Level8 = () => {
    const canvasRef = useRef(null);
    const [color, setColor] = useState('#000000');
    const [isDrawing, setIsDrawing] = useState(false);
    const [brushSize, setBrushSize] = useState(5);
    const [tool, setTool] = useState('brush'); // brush, eraser, stamp
    const [activeStamp, setActiveStamp] = useState('🏠');

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!canvas.getAttribute('data-init')) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        canvas.setAttribute('data-init', 'true');
      }
    }, []);

    const startDrawing = (e) => {
      setIsDrawing(true);
      draw(e);
    };

    const stopDrawing = () => {
      setIsDrawing(false);
      const ctx = canvasRef.current.getContext('2d');
      ctx.beginPath();
    };

    const draw = (e) => {
      if (!isDrawing) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      let clientX, clientY;
      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const x = (clientX - rect.left) * scaleX;
      const y = (clientY - rect.top) * scaleY;

      if (tool === 'stamp') {
        if (e.type === 'mousedown' || e.type === 'touchstart') {
          ctx.font = `${brushSize * 15}px Arial`; 
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(activeStamp, x, y);
        }
        return; 
      }

      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;

      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    const handleSave = () => {
      const canvas = canvasRef.current;
      const dataUrl = canvas.toDataURL('image/jpeg', 1.0);
      const link = document.createElement('a');
      link.download = `Karya_Seni_${gameState.studentName || 'Siswa'}.jpg`;
      link.href = dataUrl;
      link.click();
      
      showFeedback('Karya berhasil disimpan!', 'success');
      setTimeout(() => goToMenu(), 2000);
    };

    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7', '#78350f', '#000000', '#ffffff'];
    const stamps = ['🏠', '🏫', '🌳', '🌲', '☀️', '☁️', '🚗', '🟥', '🔵', '🔺'];

    return (
      <div className="flex flex-col gap-5 font-inter">
        <div className="bg-slate-800 p-4 rounded-2xl flex flex-wrap gap-4 justify-center items-center shadow-lg">
          <div className="flex gap-1 bg-slate-700 p-1.5 rounded-xl">
            <button onClick={() => setTool('brush')} title="Kuas" className={`p-3 rounded-lg transition-colors ${tool === 'brush' ? 'bg-blue-500 text-white shadow-inner' : 'text-slate-300 hover:bg-slate-600'}`}><PenTool size={20}/></button>
            <button onClick={() => setTool('eraser')} title="Penghapus" className={`p-3 rounded-lg transition-colors ${tool === 'eraser' ? 'bg-blue-500 text-white shadow-inner' : 'text-slate-300 hover:bg-slate-600'}`}><Eraser size={20}/></button>
            <button onClick={() => setTool('stamp')} title="Stempel Objek" className={`p-3 rounded-lg transition-colors ${tool === 'stamp' ? 'bg-blue-500 text-white shadow-inner' : 'text-slate-300 hover:bg-slate-600'}`}><Stamp size={20}/></button>
          </div>
          
          <div className="h-10 w-px bg-slate-600 mx-2"></div>
          
          {tool !== 'stamp' ? (
            <div className="flex gap-2 items-center bg-slate-700 p-2 rounded-xl">
              {colors.map(c => (
                <button key={c} onClick={() => {setColor(c); setTool('brush');}} className={`w-8 h-8 rounded-full border-2 transition-transform ${color === c && tool === 'brush' ? 'border-white scale-125 shadow-lg z-10' : 'border-slate-500 hover:scale-110'}`} style={{backgroundColor: c}}></button>
              ))}
            </div>
          ) : (
            <div className="flex gap-1 items-center bg-slate-700 p-1.5 rounded-xl flex-wrap justify-center">
              {stamps.map(s => (
                <button key={s} onClick={() => setActiveStamp(s)} className={`text-2xl p-2 rounded-lg transition-transform ${activeStamp === s ? 'bg-blue-500 scale-110 shadow-inner' : 'hover:bg-slate-600'}`}>
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="h-10 w-px bg-slate-600 mx-2"></div>
          
          <div className="flex items-center gap-3 bg-slate-700 p-3 rounded-xl text-slate-200">
            <span className="text-sm font-bold">Ukuran</span>
            <input type="range" min="1" max={tool === 'stamp' ? "15" : "30"} value={brushSize} onChange={(e) => setBrushSize(parseInt(e.target.value))} className="w-24 cursor-pointer accent-blue-500"/>
          </div>
        </div>
        
        <div className="border-4 border-slate-200 rounded-2xl overflow-hidden bg-white shadow-inner touch-none relative" style={{ aspectRatio: '16/9' }}>
          <canvas
            ref={canvasRef}
            width={1920}
            height={1080}
            className="w-full h-full object-contain bg-white cursor-crosshair touch-none"
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            onMouseMove={draw}
            onTouchStart={startDrawing}
            onTouchEnd={stopDrawing}
            onTouchMove={draw}
          />
        </div>
        
        <button onClick={handleSave} className="w-full py-5 bg-green-600 hover:bg-green-700 text-white font-black text-xl rounded-2xl shadow-xl flex justify-center items-center gap-3 transition-transform hover:scale-[1.02]">
          <Download size={28} strokeWidth={3} /> SIMPAN KARYAKU
        </button>
      </div>
    );
  };

  const renderCurrentView = () => {
    switch (gameState.currentView) {
      case 'splash':
        return (
          <div className="min-h-screen flex flex-col items-center justify-center p-6 font-inter relative overflow-hidden" 
               style={{
                 backgroundColor: '#1e3a8a', 
                 backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
                 backgroundSize: '40px 40px',
                 backgroundPosition: '0 0'
               }}>
            <div className="flex flex-col items-center justify-center w-full max-w-2xl text-center z-10">
              
              <div className="relative mb-6">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=detektif&backgroundColor=b6e3f4" alt="Profile" className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-blue-300 object-cover shadow-2xl z-10 relative bg-white" />
                <div className="absolute inset-0 rounded-full bg-blue-500 opacity-40 blur-xl -z-10 scale-150"></div>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-wide uppercase drop-shadow-lg font-inter">
                UNSUR & PRINSIP SENI RUPA
              </h1>
              
              <h2 className="text-2xl md:text-3xl font-black text-orange-500 mb-2 font-inter tracking-wider">
                KELAS 5
              </h2>
              
              <p className="text-white text-sm md:text-base font-bold mb-8 font-inter uppercase tracking-widest opacity-90">
                SD NEGERI 2 SENDANG AYU
              </p>
              
              <div className="border border-white/20 rounded-full px-8 py-3 mb-10 bg-[#2e4a9a]/50 backdrop-blur-sm">
                <span className="text-blue-100 text-sm md:text-base font-medium">Materi Pembelajaran Interaktif</span>
              </div>
              
              <button 
                onClick={() => setGameState(prev => ({...prev, currentView: 'dataEntry'}))}
                className="px-12 py-4 bg-[#f97316] hover:bg-[#ea580c] text-white font-black text-lg md:text-xl rounded-full shadow-[0_8px_30px_rgb(249,115,22,0.4)] transition-all hover:scale-105 flex items-center justify-center gap-3 font-inter"
              >
                MULAI BERMAIN <ChevronRight className="w-6 h-6 stroke-[3]" />
              </button>
            </div>
          </div>
        );

      case 'dataEntry':
        return (
          <div className="min-h-screen flex items-center justify-center p-6 font-inter" style={{ backgroundColor: '#f8fafc' }}>
            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl w-full max-w-md animate-fade-in relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-4 bg-[#1e3a8a]"></div>
              
              <h2 className="text-2xl font-black text-[#1e3a8a] text-center mb-8 mt-2">Isi Data Diri Dulu Yuk!</h2>
              
              <div className="space-y-6 mb-10">
                <div>
                  <label className="block text-slate-800 text-sm font-black mb-2">Nama Lengkap</label>
                  <input 
                    type="text" 
                    placeholder="Masukkan namamu..." 
                    className="w-full px-5 py-4 rounded-xl bg-white border border-slate-300 text-slate-800 focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a] outline-none transition-all placeholder:text-slate-400 font-medium" 
                    value={gameState.studentName} 
                    onChange={e => setGameState(prev => ({...prev, studentName: e.target.value}))}
                  />
                </div>
                <div>
                  <label className="block text-slate-800 text-sm font-black mb-2">Kelas</label>
                  <input 
                    type="text" 
                    placeholder="5" 
                    className="w-full px-5 py-4 rounded-xl bg-white border border-slate-300 text-slate-800 focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a] outline-none transition-all placeholder:text-slate-400 font-medium" 
                    value={gameState.studentClass} 
                    onChange={e => setGameState(prev => ({...prev, studentClass: e.target.value}))}
                  />
                </div>
              </div>
              
              <button 
                onClick={() => setGameState(prev => ({...prev, currentView: 'menu'}))}
                className="w-full py-4 bg-[#1e3a8a] hover:bg-[#172554] text-white font-black text-base rounded-xl shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-center gap-2 tracking-wide uppercase"
              >
                LANJUT KE PERMAINAN <Play fill="currentColor" size={18} className="ml-1" />
              </button>
            </div>
          </div>
        );

      case 'menu':
        const levels = [
          { id: 1, title: 'Kenali Unsur', icon: <BookOpen className="w-8 h-8"/>, color: 'text-blue-600', bg: 'bg-blue-100' },
          { id: 2, title: 'Cari Unsur', icon: <Search className="w-8 h-8"/>, color: 'text-indigo-600', bg: 'bg-indigo-100' },
          { id: 3, title: 'Cocokkan', icon: <MousePointerClick className="w-8 h-8"/>, color: 'text-purple-600', bg: 'bg-purple-100' },
          { id: 4, title: 'Tebak Gambar', icon: <ImageIcon className="w-8 h-8"/>, color: 'text-pink-600', bg: 'bg-pink-100' },
          { id: 5, title: 'Susun Seni', icon: <LayoutGrid className="w-8 h-8"/>, color: 'text-rose-600', bg: 'bg-rose-100' },
          { id: 6, title: 'Kenali Prinsip', icon: <Star className="w-8 h-8"/>, color: 'text-orange-600', bg: 'bg-orange-100' },
          { id: 7, title: 'Eksperimen', icon: <Palette className="w-8 h-8"/>, color: 'text-teal-600', bg: 'bg-teal-100' },
          { id: 8, title: 'Studio Seni', icon: <Trophy className="w-8 h-8"/>, color: 'text-amber-600', bg: 'bg-amber-100' },
        ];

        return (
          <div className="min-h-screen bg-slate-50 p-6 font-inter">
            <div className="max-w-4xl mx-auto">
              <header className="flex justify-between items-center mb-8 bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <div>
                  <h2 className="text-2xl font-black text-slate-800">Peta Misi</h2>
                  <p className="text-slate-500 font-medium mt-1">Halo, {gameState.studentName || 'Detektif'}! Pilih misimu.</p>
                </div>
                <div className="flex gap-4">
                  <div className="bg-red-50 border border-red-100 px-5 py-2.5 rounded-xl flex items-center gap-2 text-red-600 font-bold shadow-sm">
                    ❤️ {gameState.lives}
                  </div>
                  <div className="bg-yellow-50 border border-yellow-100 px-5 py-2.5 rounded-xl flex items-center gap-2 text-yellow-600 font-bold shadow-sm">
                    ⭐ {gameState.score}
                  </div>
                </div>
              </header>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {levels.map((level) => {
                  const isUnlocked = gameState.unlockedLevels.includes(level.id);
                  return (
                    <button
                      key={level.id}
                      onClick={() => isUnlocked && setGameState(prev => ({...prev, currentView: 'level', currentLevel: level.id}))}
                      className={`relative p-6 rounded-2xl flex flex-col items-center justify-center gap-4 transition-all ${
                        isUnlocked 
                          ? 'bg-green-50 shadow-sm border-2 border-green-400 hover:shadow-md hover:bg-green-100 hover:-translate-y-1' 
                          : 'bg-slate-100 border-2 border-slate-200 opacity-60 grayscale cursor-not-allowed'
                      }`}
                    >
                      {!isUnlocked && (
                        <div className="absolute top-3 right-3 bg-slate-300 p-1.5 rounded-full">
                          <Lock className="w-4 h-4 text-slate-600" strokeWidth={3} />
                        </div>
                      )}
                      
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${level.color} ${isUnlocked ? 'bg-white shadow-sm' : level.bg}`}>
                        {level.icon}
                      </div>
                      
                      <span className={`font-bold text-center leading-tight ${isUnlocked ? 'text-green-900' : 'text-slate-500'}`}>
                        Misi {level.id}<br/><span className="text-sm font-medium">{level.title}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'level':
        const titles = ["", "Kenali Unsur Rupa", "Temukan Unsur Rupa", "Cocokkan Tiga Serangkai", "Tebak Gambar", "Susun Seni", "Mengenal Prinsip Seni", "Eksperimen Warna", "Studio Seni Kreasiku"];
        return (
          <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-inter">
            <div className="max-w-4xl mx-auto">
              <button onClick={goToMenu} className="mb-6 text-slate-500 hover:text-slate-800 font-bold flex items-center gap-2 transition-colors bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
                &larr; Kembali ke Peta Misi
              </button>
              
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 mb-8 border-l-8 border-l-orange-500">
                <h2 className="text-2xl md:text-3xl font-black text-slate-800 flex flex-wrap items-center gap-2">
                  <span className="text-orange-500">Misi {gameState.currentLevel} :</span> {titles[gameState.currentLevel]}
                </h2>
              </div>

              {gameState.currentLevel === 1 && <Level1 />}
              {gameState.currentLevel === 2 && <Level2 />}
              {gameState.currentLevel === 3 && <Level3 />}
              {gameState.currentLevel === 4 && <Level4 />}
              {gameState.currentLevel === 5 && <Level5 />}
              {gameState.currentLevel === 6 && <Level6 />}
              {gameState.currentLevel === 7 && <Level7 />}
              {gameState.currentLevel === 8 && <Level8 />}

              <div className="mt-10 mb-8 flex justify-center">
                <button
                  onClick={() => {
                    unlockNextLevel(gameState.currentLevel);
                    goToMenu();
                  }}
                  className="px-10 py-5 bg-[#1e3a8a] hover:bg-[#172554] text-white font-black text-lg rounded-2xl shadow-xl transition-all hover:scale-105 hover:shadow-2xl flex items-center gap-3"
                >
                  LANJUTKAN MISI <ChevronRight strokeWidth={3} />
                </button>
              </div>

            </div>
          </div>
        );

      default:
        return <div>View not found</div>;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        .animate-slide-in-right { animation: slideInRight 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInRight { 
          from { opacity: 0; transform: translateX(100%); } 
          to { opacity: 1; transform: translateX(0); } 
        }
      `}</style>

      {renderCurrentView()}

      {feedbackMsg && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in-right flex items-center gap-3">
          <div className={`px-6 py-4 rounded-xl shadow-2xl font-bold text-white flex items-center gap-3 pr-14 relative border border-white/20 backdrop-blur-sm ${feedbackMsg.type === 'success' ? 'bg-green-600/95' : 'bg-red-500/95'}`}>
            {feedbackMsg.type === 'success' ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
            <span className="font-inter tracking-wide">{feedbackMsg.text}</span>
            <button 
              onClick={closeFeedback} 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 p-1.5 rounded-full transition-colors"
              aria-label="Tutup"
            >
              <X size={16} strokeWidth={3} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}