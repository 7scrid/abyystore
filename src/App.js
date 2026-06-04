import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const GAMES = [
  { id:1, name:"Mobile Legends", short:"MLBB", category:"MOBA", color:"#00d4ff", accent:"#ff6b00", trending:true,
    img:"https://images.igdb.com/igdb/image/upload/t_cover_big/co4a5o.webp",
    fields:[{id:"userId",label:"User ID",placeholder:"Contoh: 123456789"},{id:"zoneId",label:"Zone ID",placeholder:"Contoh: 1234"}],
    packages:[
      {id:1,amount:"11 Diamond",price:2500,popular:false},{id:2,amount:"22 Diamond",price:4800,popular:false},
      {id:3,amount:"56 Diamond",price:11000,popular:false},{id:4,amount:"86 Diamond",price:16500,popular:false},
      {id:5,amount:"172 Diamond",price:32000,popular:true},{id:6,amount:"257 Diamond",price:47000,popular:false},
      {id:7,amount:"514 Diamond",price:93000,popular:false},{id:8,amount:"1050 Diamond",price:185000,popular:false},
      {id:9,amount:"2195 Diamond",price:370000,popular:false},{id:10,amount:"Weekly Diamond Pass",price:25000,popular:true},
    ]},
  { id:2, name:"Free Fire", short:"FF", category:"Battle Royale", color:"#ff4500", accent:"#ffd700", trending:true,
    img:"https://images.igdb.com/igdb/image/upload/t_cover_big/co49wj.webp",
    fields:[{id:"userId",label:"User ID",placeholder:"Contoh: 123456789"}],
    packages:[
      {id:1,amount:"70 Diamond",price:14000,popular:false},{id:2,amount:"140 Diamond",price:27000,popular:false},
      {id:3,amount:"355 Diamond",price:67000,popular:true},{id:4,amount:"720 Diamond",price:132000,popular:false},
      {id:5,amount:"1450 Diamond",price:260000,popular:false},{id:6,amount:"Weekly Pass",price:22000,popular:false},
    ]},
  { id:3, name:"PUBG Mobile", short:"PUBG", category:"Battle Royale", color:"#f5a623", accent:"#00c6ff", trending:false,
    img:"https://images.igdb.com/igdb/image/upload/t_cover_big/co7urc.webp",
    fields:[{id:"userId",label:"Player ID",placeholder:"Contoh: 123456789"}],
    packages:[
      {id:1,amount:"60 UC",price:14000,popular:false},{id:2,amount:"325 UC",price:71000,popular:true},
      {id:3,amount:"660 UC",price:139000,popular:false},{id:4,amount:"1800 UC",price:370000,popular:false},
      {id:5,amount:"3850 UC",price:745000,popular:false},{id:6,amount:"8100 UC",price:1500000,popular:false},
    ]},
  { id:4, name:"Genshin Impact", short:"GI", category:"RPG", color:"#7b61ff", accent:"#00e5ff", trending:false,
    img:"https://images.igdb.com/igdb/image/upload/t_cover_big/co2mjs.webp",
    fields:[{id:"userId",label:"UID",placeholder:"Contoh: 123456789"}],
    packages:[
      {id:1,amount:"60 Genesis Crystal",price:14000,popular:false},{id:2,amount:"330 Genesis Crystal",price:72000,popular:false},
      {id:3,amount:"1090 Genesis Crystal",price:230000,popular:true},{id:4,amount:"2240 Genesis Crystal",price:460000,popular:false},
      {id:5,amount:"3880 Genesis Crystal",price:760000,popular:false},{id:6,amount:"8080 Genesis Crystal",price:1520000,popular:false},
    ]},
  { id:5, name:"Honkai: Star Rail", short:"HSR", category:"RPG", color:"#9d4edd", accent:"#f72585", trending:true,
    img:"https://images.igdb.com/igdb/image/upload/t_cover_big/co5vmg.webp",
    fields:[{id:"userId",label:"UID",placeholder:"Contoh: 123456789"}],
    packages:[
      {id:1,amount:"60 Oneiric Shard",price:14000,popular:false},{id:2,amount:"330 Oneiric Shard",price:72000,popular:false},
      {id:3,amount:"1090 Oneiric Shard",price:230000,popular:true},{id:4,amount:"2240 Oneiric Shard",price:460000,popular:false},
      {id:5,amount:"8080 Oneiric Shard",price:1520000,popular:false},
    ]},
  { id:6, name:"Valorant", short:"VAL", category:"FPS", color:"#ff4655", accent:"#ecf0f1", trending:false,
    img:"https://images.igdb.com/igdb/image/upload/t_cover_big/co2mvt.webp",
    fields:[{id:"userId",label:"Riot ID",placeholder:"Contoh: Player#ID"}],
    packages:[
      {id:1,amount:"475 VP",price:50000,popular:false},{id:2,amount:"1000 VP",price:100000,popular:false},
      {id:3,amount:"2050 VP",price:200000,popular:true},{id:4,amount:"3650 VP",price:350000,popular:false},
      {id:5,amount:"5350 VP",price:500000,popular:false},
    ]},
  { id:7, name:"Call of Duty Mobile", short:"CODM", category:"FPS", color:"#1a8c1a", accent:"#c8a951", trending:false,
    img:"https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7k.webp",
    fields:[{id:"userId",label:"Player ID",placeholder:"Contoh: 123456789"}],
    packages:[
      {id:1,amount:"80 CP",price:15000,popular:false},{id:2,amount:"400 CP",price:70000,popular:false},
      {id:3,amount:"800 CP",price:135000,popular:true},{id:4,amount:"2000 CP",price:320000,popular:false},
      {id:5,amount:"5000 CP",price:760000,popular:false},
    ]},
  { id:8, name:"Arena of Valor", short:"AoV", category:"MOBA", color:"#e63946", accent:"#f4a261", trending:false,
    img:"https://images.igdb.com/igdb/image/upload/t_cover_big/co1wkp.webp",
    fields:[{id:"userId",label:"Player ID",placeholder:"Contoh: 123456789"}],
    packages:[
      {id:1,amount:"60 Voucher",price:12000,popular:false},{id:2,amount:"330 Voucher",price:62000,popular:true},
      {id:3,amount:"700 Voucher",price:130000,popular:false},{id:4,amount:"1500 Voucher",price:270000,popular:false},
    ]},
];

const VALID_VOUCHERS = { "ABYY10": 10, "NEWUSER": 15, "HEMAT20": 20 };

const PAYMENTS = [
  {id:"qris",name:"QRIS",icon:"⚡",cat:"E-Wallet & QRIS"},
  {id:"gopay",name:"GoPay",icon:"💚",cat:"E-Wallet & QRIS"},
  {id:"dana",name:"DANA",icon:"💙",cat:"E-Wallet & QRIS"},
  {id:"ovo",name:"OVO",icon:"💜",cat:"E-Wallet & QRIS"},
  {id:"shopeepay",name:"ShopeePay",icon:"🧡",cat:"E-Wallet & QRIS"},
  {id:"bni",name:"BNI",icon:"🏦",cat:"Virtual Account"},
  {id:"bri",name:"BRI",icon:"🏦",cat:"Virtual Account"},
  {id:"mandiri",name:"Mandiri",icon:"🏦",cat:"Virtual Account"},
  {id:"bca",name:"BCA",icon:"🏦",cat:"Virtual Account"},
  {id:"bsi",name:"BSI",icon:"🏦",cat:"Virtual Account"},
  {id:"alfamart",name:"Alfamart",icon:"🏪",cat:"Minimarket"},
  {id:"indomaret",name:"Indomaret",icon:"🏪",cat:"Minimarket"},
];

const FAQS = [
  {q:"Berapa lama proses top up?", a:"Proses top up berlangsung otomatis kurang dari 30 detik setelah pembayaran berhasil dikonfirmasi."},
  {q:"Apakah top up di AbyyStore aman?", a:"Ya, AbyyStore menggunakan payment gateway resmi (Midtrans) dan sistem enkripsi SSL. Semua transaksi terenkripsi dan aman."},
  {q:"Bagaimana jika top up gagal?", a:"Jika top up gagal setelah pembayaran berhasil, tim CS kami akan segera memproses refund atau retry dalam 1x24 jam."},
  {q:"Metode pembayaran apa saja yang tersedia?", a:"Kami mendukung QRIS, GoPay, Dana, OVO, ShopeePay, Virtual Account BNI/BRI/Mandiri/BCA/BSI, serta Alfamart dan Indomaret."},
  {q:"Bagaimana cara mengetahui User ID saya?", a:"Buka game → menu profil → User ID biasanya tertera di bawah nama karakter. Untuk MLBB: klik profil kiri atas, lihat angka di bawah nama."},
  {q:"Apakah ada biaya tambahan?", a:"Tidak ada biaya tambahan tersembunyi. Harga yang tertera adalah harga final yang harus dibayar."},
];

const REVIEWS = [
  {name:"RizkyGamer",game:"Mobile Legends",text:"Proses cepet banget! Gak sampai 1 menit diamond udah masuk.",rating:5,time:"2 jam lalu"},
  {name:"Putri_FF",game:"Free Fire",text:"Harga paling murah, recommended banget buat temen-temen!",rating:5,time:"5 jam lalu"},
  {name:"ArjunoPUBG",game:"PUBG Mobile",text:"Udah langganan 2 tahun, ga pernah kecewa sama sekali.",rating:5,time:"1 hari lalu"},
  {name:"GenshinFan",game:"Genshin Impact",text:"Top up Genesis Crystal langsung masuk, mantap!",rating:5,time:"1 hari lalu"},
  {name:"ValPlayer",game:"Valorant",text:"Pelayanannya ramah, proses cepat. 5 bintang!",rating:5,time:"2 hari lalu"},
  {name:"MLBBPro",game:"Mobile Legends",text:"Harga WDP paling murah, selalu beli di sini.",rating:5,time:"3 hari lalu"},
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const rp = n => "Rp " + n.toLocaleString("id-ID");
const uuid = () => "ABY-" + Math.random().toString(36).substr(2,9).toUpperCase();

function validatePhone(v) {
  return /^(08|628|\+628)\d{8,12}$/.test(v.replace(/\s/g,""));
}
function validateUserId(v) {
  return /^\d{5,15}$/.test(v.trim());
}

// ─── TOAST ───────────────────────────────────────────────────────────────────
function Toast({ toasts }) {
  return (
    <div style={{ position:"fixed", bottom:80, right:20, zIndex:9999, display:"flex", flexDirection:"column", gap:10 }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          background: t.type==="success" ? "rgba(0,200,83,0.95)" : t.type==="error" ? "rgba(255,50,50,0.95)" : "rgba(0,212,255,0.95)",
          color:"#fff", borderRadius:12, padding:"12px 20px", fontSize:14, fontWeight:600,
          boxShadow:"0 8px 32px rgba(0,0,0,0.4)", animation:"slideIn 0.3s ease",
          display:"flex", alignItems:"center", gap:10, maxWidth:300,
        }}>
          <span>{t.type==="success"?"✅":t.type==="error"?"❌":"ℹ️"}</span>
          {t.msg}
        </div>
      ))}
    </div>
  );
}

// ─── LOADING SCREEN ──────────────────────────────────────────────────────────
function LoadingScreen({ done }) {
  const [prog, setProg] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => {
      setProg(p => { if(p >= 100){ clearInterval(iv); setTimeout(done, 300); return 100; } return p + 4; });
    }, 40);
    return () => clearInterval(iv);
  }, []);
  return (
    <div style={{
      position:"fixed", inset:0, background:"#05050f", zIndex:10000,
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
    }}>
      <div style={{
        fontFamily:"'Orbitron',sans-serif", fontWeight:900, fontSize:36,
        color:"#fff", marginBottom:8, letterSpacing:2,
      }}>Abyy<span style={{color:"#00d4ff"}}>Store</span></div>
      <p style={{color:"rgba(255,255,255,0.4)", fontSize:13, marginBottom:40}}>Platform Top Up Game Terpercaya</p>
      <div style={{width:240, height:4, background:"rgba(255,255,255,0.1)", borderRadius:99, overflow:"hidden"}}>
        <div style={{
          width:`${prog}%`, height:"100%",
          background:"linear-gradient(90deg,#00d4ff,#7b61ff)", transition:"width 0.04s linear",
        }}/>
      </div>
      <p style={{color:"rgba(255,255,255,0.3)", fontSize:12, marginTop:16}}>{prog}%</p>
    </div>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar({ page, setPage }) {
  const [mob, setMob] = useState(false);
  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:100,
      background:"rgba(5,5,15,0.9)", backdropFilter:"blur(20px)",
      borderBottom:"1px solid rgba(255,255,255,0.06)",
      display:"flex", alignItems:"center", justifyContent:"space-between",
      padding:"0 24px", height:64,
    }}>
      <div onClick={()=>setPage("home")} style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}}>
        <div style={{
          width:36,height:36,borderRadius:10,
          background:"linear-gradient(135deg,#00d4ff,#7b61ff)",
          display:"flex",alignItems:"center",justifyContent:"center",
          fontWeight:900,fontSize:16,color:"#fff",
        }}>A</div>
        <span style={{fontFamily:"'Orbitron',sans-serif",fontWeight:800,fontSize:18,color:"#fff"}}>
          Abyy<span style={{color:"#00d4ff"}}>Store</span>
        </span>
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        {[["home","🏠 Home"],["track","📦 Lacak"],["faq","❓ FAQ"],["admin","⚙️ Admin"]].map(([p,l])=>(
          <button key={p} onClick={()=>setPage(p)} style={{
            background: page===p ? "linear-gradient(135deg,#00d4ff,#7b61ff)" : "rgba(255,255,255,0.05)",
            border: page===p ? "none" : "1px solid rgba(255,255,255,0.08)",
            color:"#fff", borderRadius:8, padding:"7px 14px",
            cursor:"pointer", fontFamily:"inherit", fontSize:12, fontWeight:600,
          }}>{l}</button>
        ))}
      </div>
    </nav>
  );
}

// ─── PROMO BANNER ────────────────────────────────────────────────────────────
function PromoBanner() {
  const promos = [
    "🎉 Kode ABYY10 — Diskon 10% semua produk!",
    "🔥 Kode NEWUSER — Diskon 15% untuk pengguna baru!",
    "💎 Kode HEMAT20 — Diskon 20% khusus hari ini!",
  ];
  const [idx, setIdx] = useState(0);
  useEffect(()=>{
    const iv = setInterval(()=> setIdx(i=>(i+1)%promos.length), 3000);
    return ()=>clearInterval(iv);
  },[]);
  return (
    <div style={{
      background:"linear-gradient(90deg,#7b61ff,#00d4ff,#ff6b00)",
      padding:"10px 24px", textAlign:"center",
      fontSize:13, fontWeight:700, color:"#fff", letterSpacing:0.5,
    }}>{promos[idx]}</div>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero({ onScroll }) {
  return (
    <div style={{
      minHeight:"100vh", display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center", textAlign:"center",
      padding:"100px 24px 60px",
      background:"radial-gradient(ellipse 80% 60% at 50% 0%,rgba(0,212,255,0.12) 0%,transparent 70%)",
      position:"relative",
    }}>
      {[600,400,250].map(s=>(
        <div key={s} style={{
          position:"absolute",width:s,height:s,borderRadius:"50%",
          border:"1px solid rgba(0,212,255,0.05)",
          top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none",
        }}/>
      ))}
      <div style={{
        display:"inline-block",background:"rgba(0,212,255,0.1)",
        border:"1px solid rgba(0,212,255,0.2)",borderRadius:999,
        padding:"6px 18px",fontSize:11,color:"#00d4ff",
        letterSpacing:2,textTransform:"uppercase",marginBottom:24,
        fontFamily:"'Orbitron',sans-serif",
      }}>⚡ Topup Instan & Terpercaya</div>
      <h1 style={{
        fontFamily:"'Orbitron',sans-serif",fontWeight:900,
        fontSize:"clamp(32px,6vw,68px)",color:"#fff",
        lineHeight:1.1,marginBottom:20,
      }}>
        Top Up Game<br/>
        <span style={{background:"linear-gradient(90deg,#00d4ff,#7b61ff,#ff6b00)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
          Tercepat & Termurah
        </span>
      </h1>
      <p style={{color:"rgba(255,255,255,0.5)",fontSize:16,maxWidth:480,lineHeight:1.7,marginBottom:36}}>
        Proses otomatis dalam hitungan detik. 8+ game populer, harga kompetitif, pembayaran lengkap.
      </p>
      <div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center",marginBottom:48}}>
        <button onClick={onScroll} style={{
          background:"linear-gradient(135deg,#00d4ff,#7b61ff)",
          border:"none",color:"#fff",borderRadius:12,
          padding:"14px 32px",fontSize:15,fontWeight:700,
          cursor:"pointer",fontFamily:"inherit",
        }}>Mulai Top Up →</button>
        <button onClick={onScroll} style={{
          background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",
          color:"#fff",borderRadius:12,padding:"14px 28px",
          fontSize:15,cursor:"pointer",fontFamily:"inherit",
        }}>Lihat Game</button>
      </div>
      <div style={{display:"flex",gap:40,flexWrap:"wrap",justifyContent:"center"}}>
        {[["50K+","Transaksi"],["8+","Game"],["99.9%","Sukses"],["<30det","Proses"]].map(([v,l])=>(
          <div key={l} style={{textAlign:"center"}}>
            <div style={{fontFamily:"'Orbitron',sans-serif",fontWeight:900,fontSize:26,color:"#fff"}}>{v}</div>
            <div style={{color:"rgba(255,255,255,0.4)",fontSize:12}}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── GAME CARD ───────────────────────────────────────────────────────────────
function GameCard({ game, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={()=>onClick(game)}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        background: hov ? `rgba(0,0,0,0.7)` : "rgba(255,255,255,0.03)",
        border:`1px solid ${hov ? game.color+"55" : "rgba(255,255,255,0.07)"}`,
        borderRadius:16,overflow:"hidden",cursor:"pointer",
        transition:"all 0.3s",transform: hov ? "translateY(-5px)" : "none",
        boxShadow: hov ? `0 16px 40px ${game.color}25` : "none",
      }}
    >
      <div style={{height:140,overflow:"hidden",position:"relative",background:`linear-gradient(135deg,${game.color}22,${game.accent}11)`}}>
        <img src={game.img} alt={game.name} style={{width:"100%",height:"100%",objectFit:"cover",opacity:0.85}} onError={e=>{e.target.style.display="none"}}/>
        <div style={{position:"absolute",top:8,left:8,display:"flex",gap:6}}>
          <div style={{background:`${game.color}22`,border:`1px solid ${game.color}44`,borderRadius:6,padding:"3px 8px",fontSize:10,color:game.color,fontWeight:700}}>{game.category}</div>
          {game.trending && <div style={{background:"rgba(255,215,0,0.2)",border:"1px solid rgba(255,215,0,0.5)",borderRadius:6,padding:"3px 8px",fontSize:10,color:"#ffd700",fontWeight:700}}>🔥 TRENDING</div>}
        </div>
      </div>
      <div style={{padding:16}}>
        <div style={{fontWeight:800,fontSize:15,color:"#fff",marginBottom:4}}>{game.name}</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.4)",marginBottom:12}}>{game.packages.length} pilihan nominal</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontSize:13,color:game.color,fontWeight:600}}>Mulai {rp(game.packages[0].price)}</div>
          <div style={{background:game.color,color:"#000",borderRadius:6,padding:"4px 12px",fontSize:12,fontWeight:700}}>Top Up</div>
        </div>
      </div>
    </div>
  );
}

// ─── TOPUP FORM ──────────────────────────────────────────────────────────────
function TopupForm({ game, addToast, onBack }) {
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});
  const [pkg, setPkg] = useState(null);
  const [pay, setPay] = useState(null);
  const [voucher, setVoucher] = useState("");
  const [discount, setDiscount] = useState(0);
  const [voucherMsg, setVoucherMsg] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [orderId, setOrderId] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const coolRef = useRef(null);

  const finalPrice = pkg ? Math.round(pkg.price * (1 - discount/100)) : 0;
  const payGroups = ["E-Wallet & QRIS","Virtual Account","Minimarket"];

  const applyVoucher = () => {
    const code = voucher.trim().toUpperCase();
    if(VALID_VOUCHERS[code]) {
      setDiscount(VALID_VOUCHERS[code]);
      setVoucherMsg(`✅ Voucher berhasil! Diskon ${VALID_VOUCHERS[code]}%`);
      addToast(`Voucher ${code} berhasil diterapkan!`, "success");
    } else {
      setVoucherMsg("❌ Kode voucher tidak valid.");
      addToast("Kode voucher tidak valid!", "error");
    }
  };

  const validate = () => {
    const e = {};
    game.fields.forEach(f => {
      const v = fields[f.id] || "";
      if(!v) { e[f.id] = `${f.label} wajib diisi`; return; }
      if(f.id !== "riotId" && !validateUserId(v)) e[f.id] = `${f.label} harus berupa angka (5-15 digit)`;
    });
    if(!pkg) e.pkg = "Pilih nominal terlebih dahulu";
    if(!pay) e.pay = "Pilih metode pembayaran";
    if(!phone) e.phone = "Nomor WhatsApp wajib diisi";
    else if(!validatePhone(phone)) e.phone = "Format nomor tidak valid (contoh: 08123456789)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleOrder = () => {
    if(cooldown > 0) { addToast(`Tunggu ${cooldown} detik sebelum order lagi`, "error"); return; }
    if(!validate()) { addToast("Harap lengkapi semua data!", "error"); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const oid = uuid();
      setOrderId(oid);
      setStep(2);
      setCooldown(30);
      if(coolRef.current) clearInterval(coolRef.current);
      coolRef.current = setInterval(()=>{
        setCooldown(c=>{ if(c<=1){ clearInterval(coolRef.current); return 0; } return c-1; });
      },1000);
      addToast("Pesanan berhasil dibuat!", "success");
    }, 2000);
  };

  if(step === 2) return (
    <div style={{maxWidth:480,margin:"0 auto",padding:24,textAlign:"center"}}>
      <div style={{width:80,height:80,borderRadius:"50%",background:"linear-gradient(135deg,#00c853,#00e676)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,margin:"0 auto 24px"}}>✓</div>
      <h2 style={{color:"#fff",fontFamily:"'Orbitron',sans-serif",marginBottom:8}}>Pesanan Dibuat!</h2>
      <p style={{color:"rgba(255,255,255,0.5)",marginBottom:6,fontSize:14}}>ID Pesanan kamu:</p>
      <div style={{
        background:"rgba(0,212,255,0.1)",border:"1px solid rgba(0,212,255,0.3)",
        borderRadius:10,padding:"10px 20px",color:"#00d4ff",fontFamily:"'Orbitron',sans-serif",
        fontWeight:800,fontSize:18,marginBottom:24,letterSpacing:2,
      }}>{orderId}</div>
      <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:20,marginBottom:24,textAlign:"left"}}>
        {[[" Game",game.name],["Nominal",pkg.amount],["Harga",rp(finalPrice)],["Diskon",discount?`${discount}%`:"—"],["Pembayaran",PAYMENTS.find(p=>p.id===pay)?.name],["No. WA",phone]].map(([k,v])=>(
          <div key={k} style={{display:"flex",justifyContent:"space-between",marginBottom:10,fontSize:14}}>
            <span style={{color:"rgba(255,255,255,0.4)"}}>{k}</span>
            <span style={{color:"#fff",fontWeight:600}}>{v}</span>
          </div>
        ))}
      </div>
      <p style={{color:"rgba(255,255,255,0.35)",fontSize:12,marginBottom:20}}>
        Screenshot halaman ini sebagai bukti. Notifikasi akan dikirim ke WhatsApp kamu.
      </p>
      <div style={{display:"flex",gap:12}}>
        <button onClick={onBack} style={{flex:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",color:"#fff",borderRadius:10,padding:13,cursor:"pointer",fontFamily:"inherit",fontSize:14}}>← Home</button>
        <button style={{flex:1,background:"linear-gradient(135deg,#00d4ff,#7b61ff)",border:"none",color:"#fff",borderRadius:10,padding:13,cursor:"pointer",fontFamily:"inherit",fontSize:14,fontWeight:700}}>💳 Bayar Sekarang</button>
      </div>
    </div>
  );

  return (
    <div style={{maxWidth:560,margin:"0 auto",padding:"0 16px 80px"}}>
      <div style={{display:"flex",alignItems:"center",gap:16,padding:"24px 0 20px"}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"#fff",borderRadius:8,padding:"8px 14px",cursor:"pointer",fontFamily:"inherit",fontSize:14}}>← Kembali</button>
        <div>
          <div style={{fontFamily:"'Orbitron',sans-serif",fontWeight:800,color:"#fff",fontSize:18}}>{game.name}</div>
          <div style={{color:"rgba(255,255,255,0.4)",fontSize:12}}>{game.category}</div>
        </div>
      </div>

      {/* Step 1 */}
      {[{num:1,title:"Lengkapi Data Akun",content:(
        game.fields.map(f=>(
          <div key={f.id} style={{marginBottom:12}}>
            <label style={{color:"rgba(255,255,255,0.6)",fontSize:13,display:"block",marginBottom:6}}>{f.label}</label>
            <input value={fields[f.id]||""} onChange={e=>{ setFields({...fields,[f.id]:e.target.value}); setErrors({...errors,[f.id]:""}); }}
              placeholder={f.placeholder}
              style={{width:"100%",background:"rgba(255,255,255,0.06)",border:`1px solid ${errors[f.id]?"#ff4444":"rgba(255,255,255,0.1)"}`,borderRadius:10,padding:"11px 14px",color:"#fff",fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:"inherit"}}/>
            {errors[f.id] && <p style={{color:"#ff6b6b",fontSize:12,marginTop:4}}>⚠ {errors[f.id]}</p>}
          </div>
        ))
      )},
      {num:2,title:"Pilih Nominal",content:(
        <>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>
          {game.packages.map(p=>(
            <div key={p.id} onClick={()=>{setPkg(p);setErrors({...errors,pkg:""})}} style={{
              background:pkg?.id===p.id?`linear-gradient(135deg,${game.color}22,${game.color}11)`:"rgba(255,255,255,0.04)",
              border:`1.5px solid ${pkg?.id===p.id?game.color:"rgba(255,255,255,0.08)"}`,
              borderRadius:12,padding:"12px 14px",cursor:"pointer",transition:"all 0.2s",position:"relative",
            }}>
              {p.popular && <div style={{position:"absolute",top:-8,right:10,background:"#ffd700",color:"#000",borderRadius:4,padding:"2px 7px",fontSize:10,fontWeight:800}}>POPULER</div>}
              <div style={{color:"#fff",fontWeight:700,fontSize:13,marginBottom:4}}>{p.amount}</div>
              <div style={{color:game.color,fontWeight:700,fontSize:14}}>{rp(p.price)}</div>
            </div>
          ))}
        </div>
        {errors.pkg && <p style={{color:"#ff6b6b",fontSize:12,marginTop:8}}>⚠ {errors.pkg}</p>}
        </>
      )},
      {num:3,title:"Metode Pembayaran",content:(
        <>
        {payGroups.map(g=>(
          <div key={g} style={{marginBottom:16}}>
            <div style={{color:"rgba(255,255,255,0.35)",fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>{g}</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
              {PAYMENTS.filter(p=>p.cat===g).map(pm=>(
                <div key={pm.id} onClick={()=>{setPay(pm.id);setErrors({...errors,pay:""})}} style={{
                  background:pay===pm.id?"rgba(0,212,255,0.1)":"rgba(255,255,255,0.04)",
                  border:`1.5px solid ${pay===pm.id?"#00d4ff":"rgba(255,255,255,0.08)"}`,
                  borderRadius:10,padding:"10px 8px",cursor:"pointer",textAlign:"center",transition:"all 0.2s",
                }}>
                  <div style={{fontSize:20,marginBottom:4}}>{pm.icon}</div>
                  <div style={{fontSize:11,color:pay===pm.id?"#00d4ff":"rgba(255,255,255,0.6)",fontWeight:600}}>{pm.name}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {errors.pay && <p style={{color:"#ff6b6b",fontSize:12}}>⚠ {errors.pay}</p>}
        </>
      )},
      {num:4,title:"Kode Voucher (Opsional)",content:(
        <>
        <div style={{display:"flex",gap:10,marginBottom:8}}>
          <input value={voucher} onChange={e=>setVoucher(e.target.value)} placeholder="Masukkan kode voucher..."
            style={{flex:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"11px 14px",color:"#fff",fontSize:14,outline:"none",fontFamily:"inherit"}}/>
          <button onClick={applyVoucher} style={{background:"rgba(0,212,255,0.15)",border:"1px solid rgba(0,212,255,0.3)",color:"#00d4ff",borderRadius:10,padding:"11px 20px",cursor:"pointer",fontFamily:"inherit",fontSize:14,fontWeight:700}}>Gunakan</button>
        </div>
        {voucherMsg && <p style={{fontSize:13,color:discount>0?"#00c853":"#ff6b6b"}}>{voucherMsg}</p>}
        <p style={{color:"rgba(255,255,255,0.3)",fontSize:12,marginTop:8}}>Kode tersedia: ABYY10 · NEWUSER · HEMAT20</p>
        </>
      )},
      {num:5,title:"Konfirmasi Pesanan",content:(
        <>
        <label style={{color:"rgba(255,255,255,0.6)",fontSize:13,display:"block",marginBottom:6}}>No. WhatsApp</label>
        <input value={phone} onChange={e=>{setPhone(e.target.value);setErrors({...errors,phone:""})}} placeholder="Contoh: 08123456789"
          style={{width:"100%",background:"rgba(255,255,255,0.06)",border:`1px solid ${errors.phone?"#ff4444":"rgba(255,255,255,0.1)"}`,borderRadius:10,padding:"11px 14px",color:"#fff",fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:"inherit",marginBottom:4}}/>
        {errors.phone && <p style={{color:"#ff6b6b",fontSize:12,marginBottom:8}}>⚠ {errors.phone}</p>}
        {pkg && (
          <div style={{background:"rgba(0,212,255,0.06)",border:"1px solid rgba(0,212,255,0.15)",borderRadius:10,padding:14,margin:"12px 0"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:14}}>
              <span style={{color:"rgba(255,255,255,0.5)"}}>{pkg.amount}</span>
              <span style={{color:"rgba(255,255,255,0.6)",textDecoration:discount?"line-through":"none"}}>{rp(pkg.price)}</span>
            </div>
            {discount>0 && (
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:14}}>
                <span style={{color:"#00c853"}}>Diskon {discount}%</span>
                <span style={{color:"#00c853"}}>-{rp(pkg.price - finalPrice)}</span>
              </div>
            )}
            <div style={{borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:8,display:"flex",justifyContent:"space-between"}}>
              <span style={{color:"rgba(255,255,255,0.5)",fontSize:14}}>Total</span>
              <span style={{color:"#00d4ff",fontWeight:800,fontSize:16}}>{rp(finalPrice)}</span>
            </div>
          </div>
        )}
        <button onClick={handleOrder} disabled={loading || cooldown>0} style={{
          width:"100%",background:loading||cooldown>0?"rgba(255,255,255,0.1)":"linear-gradient(135deg,#00d4ff,#7b61ff)",
          border:"none",color:"#fff",borderRadius:12,padding:15,fontSize:16,fontWeight:800,
          cursor:loading||cooldown>0?"not-allowed":"pointer",fontFamily:"'Orbitron',sans-serif",letterSpacing:1,
        }}>
          {loading?"⏳ Memproses..." : cooldown>0 ? `⏱ Tunggu ${cooldown}s` : "⚡ BELI SEKARANG"}
        </button>
        {cooldown>0 && <p style={{textAlign:"center",color:"rgba(255,255,255,0.3)",fontSize:12,marginTop:8}}>Rate limiting aktif untuk keamanan transaksi</p>}
        <p style={{textAlign:"center",color:"rgba(255,255,255,0.25)",fontSize:11,marginTop:8}}>Dengan membeli, kamu menyetujui Syarat & Ketentuan AbyyStore</p>
        </>
      )}
      ].map(({num,title,content})=>(
        <div key={num} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,padding:20,marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
            <div style={{width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#00d4ff,#7b61ff)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:"#fff"}}>{num}</div>
            <span style={{color:"#fff",fontWeight:700,fontSize:15}}>{title}</span>
          </div>
          {content}
        </div>
      ))}
    </div>
  );
}

// ─── TRACK ORDER ─────────────────────────────────────────────────────────────
function TrackOrder({ addToast }) {
  const [id, setId] = useState("");
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = () => {
    if(!id.trim()) { addToast("Masukkan ID pesanan!", "error"); return; }
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
      if(id.startsWith("ABY-")) {
        setRes({ status:"success", game:"Mobile Legends", nominal:"172 Diamond", date:new Date().toLocaleDateString("id-ID"), phone:"08***56789" });
        addToast("Pesanan ditemukan!", "success");
      } else {
        setRes({ status:"not_found" });
        addToast("ID pesanan tidak ditemukan", "error");
      }
    }, 1500);
  };

  return (
    <div style={{maxWidth:480,margin:"0 auto",padding:"90px 24px 60px"}}>
      <h2 style={{fontFamily:"'Orbitron',sans-serif",color:"#fff",marginBottom:8,fontSize:24}}>Lacak Pesanan</h2>
      <p style={{color:"rgba(255,255,255,0.4)",marginBottom:24,fontSize:14}}>Masukkan ID pesanan (format: ABY-XXXXXXXX)</p>
      <div style={{display:"flex",gap:10,marginBottom:20}}>
        <input value={id} onChange={e=>setId(e.target.value)} placeholder="Contoh: ABY-ABC123XY"
          style={{flex:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"12px 14px",color:"#fff",fontSize:14,outline:"none",fontFamily:"inherit"}}/>
        <button onClick={handleTrack} style={{background:"linear-gradient(135deg,#00d4ff,#7b61ff)",border:"none",color:"#fff",borderRadius:10,padding:"12px 20px",cursor:"pointer",fontFamily:"inherit",fontSize:14,fontWeight:700}}>
          {loading ? "..." : "Cek"}
        </button>
      </div>
      {res && res.status === "success" && (
        <div style={{background:"rgba(0,200,83,0.05)",border:"1px solid rgba(0,200,83,0.2)",borderRadius:16,padding:20}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
            <div style={{width:36,height:36,borderRadius:"50%",background:"#00c853",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>✓</div>
            <div>
              <div style={{color:"#00c853",fontWeight:700}}>Transaksi Berhasil</div>
              <div style={{color:"rgba(255,255,255,0.4)",fontSize:12}}>{res.date}</div>
            </div>
          </div>
          {[["ID Pesanan",id],["Game",res.game],["Nominal",res.nominal],["No. WA",res.phone]].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",marginBottom:10,fontSize:14}}>
              <span style={{color:"rgba(255,255,255,0.4)"}}>{k}</span>
              <span style={{color:"#fff",fontWeight:600}}>{v}</span>
            </div>
          ))}
        </div>
      )}
      {res && res.status === "not_found" && (
        <div style={{background:"rgba(255,68,68,0.05)",border:"1px solid rgba(255,68,68,0.2)",borderRadius:16,padding:20,textAlign:"center"}}>
          <div style={{fontSize:40,marginBottom:12}}>🔍</div>
          <p style={{color:"#ff6b6b",fontWeight:600}}>ID pesanan tidak ditemukan</p>
          <p style={{color:"rgba(255,255,255,0.4)",fontSize:13,marginTop:8}}>Pastikan ID yang kamu masukkan benar (format: ABY-XXXXXXXX)</p>
        </div>
      )}
    </div>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{maxWidth:700,margin:"0 auto",padding:"90px 24px 60px"}}>
      <h2 style={{fontFamily:"'Orbitron',sans-serif",color:"#fff",marginBottom:8,fontSize:24,textAlign:"center"}}>FAQ</h2>
      <p style={{color:"rgba(255,255,255,0.4)",marginBottom:36,textAlign:"center",fontSize:14}}>Pertanyaan yang sering ditanyakan</p>
      {FAQS.map((f,i)=>(
        <div key={i} onClick={()=>setOpen(open===i?null:i)} style={{
          background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",
          borderRadius:14,marginBottom:10,overflow:"hidden",cursor:"pointer",
          transition:"all 0.2s",
        }}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 20px"}}>
            <span style={{color:"#fff",fontWeight:600,fontSize:15}}>{f.q}</span>
            <span style={{color:"#00d4ff",fontSize:20,transform:open===i?"rotate(45deg)":"none",transition:"0.2s"}}>+</span>
          </div>
          {open===i && (
            <div style={{padding:"0 20px 16px",color:"rgba(255,255,255,0.6)",fontSize:14,lineHeight:1.7}}>{f.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── ADMIN DASHBOARD ─────────────────────────────────────────────────────────
function AdminDashboard({ addToast }) {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const ADMIN_PASS = "admin123";

  const fakeOrders = [
    {id:"ABY-XK92LM3P",game:"Mobile Legends",nominal:"172 Diamond",price:32000,status:"success",time:"2 menit lalu",phone:"0812****89"},
    {id:"ABY-TQ84NB7W",game:"Free Fire",nominal:"355 Diamond",price:67000,status:"success",time:"15 menit lalu",phone:"0857****23"},
    {id:"ABY-PL31CR6Y",game:"PUBG Mobile",nominal:"325 UC",price:71000,status:"pending",time:"30 menit lalu",phone:"0895****17"},
    {id:"ABY-WM59DV2A",game:"Genshin Impact",nominal:"1090 Genesis Crystal",price:230000,status:"success",time:"1 jam lalu",phone:"0813****55"},
    {id:"ABY-YN76FH4K",game:"Valorant",nominal:"2050 VP",price:200000,status:"failed",time:"2 jam lalu",phone:"0878****40"},
    {id:"ABY-BJ28QE5R",game:"Honkai: Star Rail",nominal:"330 Oneiric Shard",price:72000,status:"success",time:"3 jam lalu",phone:"0821****66"},
  ];

  const stats = [
    {label:"Total Transaksi",val:"50,142",icon:"📦",color:"#00d4ff"},
    {label:"Sukses Hari Ini",val:"247",icon:"✅",color:"#00c853"},
    {label:"Pending",val:"3",icon:"⏳",color:"#ffd700"},
    {label:"Revenue Hari Ini",val:"Rp 4.2jt",icon:"💰",color:"#ff6b00"},
  ];

  if(!authed) return (
    <div style={{maxWidth:360,margin:"0 auto",padding:"120px 24px",textAlign:"center"}}>
      <div style={{fontSize:48,marginBottom:16}}>🔐</div>
      <h2 style={{color:"#fff",fontFamily:"'Orbitron',sans-serif",marginBottom:8}}>Admin Panel</h2>
      <p style={{color:"rgba(255,255,255,0.4)",marginBottom:24,fontSize:14}}>Masukkan password admin</p>
      <input type="password" value={pass} onChange={e=>setPass(e.target.value)}
        onKeyDown={e=>{ if(e.key==="Enter"){ if(pass===ADMIN_PASS){setAuthed(true);addToast("Login berhasil!","success")} else addToast("Password salah!","error"); }}}
        placeholder="Password..."
        style={{width:"100%",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"12px 16px",color:"#fff",fontSize:15,outline:"none",boxSizing:"border-box",fontFamily:"inherit",marginBottom:12}}/>
      <button onClick={()=>{ if(pass===ADMIN_PASS){setAuthed(true);addToast("Login berhasil!","success")} else addToast("Password salah!","error"); }}
        style={{width:"100%",background:"linear-gradient(135deg,#00d4ff,#7b61ff)",border:"none",color:"#fff",borderRadius:10,padding:13,cursor:"pointer",fontFamily:"inherit",fontSize:15,fontWeight:700}}>
        Masuk
      </button>
      <p style={{color:"rgba(255,255,255,0.2)",fontSize:12,marginTop:12}}>Demo password: admin123</p>
    </div>
  );

  return (
    <div style={{maxWidth:900,margin:"0 auto",padding:"90px 24px 60px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28}}>
        <h2 style={{fontFamily:"'Orbitron',sans-serif",color:"#fff",fontSize:22}}>Admin Dashboard</h2>
        <button onClick={()=>{setAuthed(false);addToast("Logout berhasil","info")}} style={{background:"rgba(255,68,68,0.15)",border:"1px solid rgba(255,68,68,0.3)",color:"#ff6b6b",borderRadius:8,padding:"7px 16px",cursor:"pointer",fontFamily:"inherit",fontSize:13}}>Logout</button>
      </div>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:14,marginBottom:28}}>
        {stats.map(s=>(
          <div key={s.label} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:20}}>
            <div style={{fontSize:28,marginBottom:8}}>{s.icon}</div>
            <div style={{fontFamily:"'Orbitron',sans-serif",fontWeight:900,fontSize:22,color:s.color,marginBottom:4}}>{s.val}</div>
            <div style={{color:"rgba(255,255,255,0.4)",fontSize:13}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Transactions Table */}
      <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,overflow:"hidden"}}>
        <div style={{padding:"16px 20px",borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
          <span style={{color:"#fff",fontWeight:700,fontSize:15}}>Transaksi Terbaru</span>
        </div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr style={{background:"rgba(255,255,255,0.03)"}}>
                {["ID Pesanan","Game","Nominal","Harga","No. WA","Status","Waktu"].map(h=>(
                  <th key={h} style={{padding:"12px 16px",textAlign:"left",color:"rgba(255,255,255,0.4)",fontSize:12,fontWeight:700,letterSpacing:0.5,whiteSpace:"nowrap"}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fakeOrders.map((o,i)=>(
                <tr key={o.id} style={{borderTop:"1px solid rgba(255,255,255,0.04)",background:i%2===0?"transparent":"rgba(255,255,255,0.01)"}}>
                  <td style={{padding:"12px 16px",color:"#00d4ff",fontFamily:"'Orbitron',sans-serif",fontSize:11,whiteSpace:"nowrap"}}>{o.id}</td>
                  <td style={{padding:"12px 16px",color:"#fff",fontSize:13,whiteSpace:"nowrap"}}>{o.game}</td>
                  <td style={{padding:"12px 16px",color:"rgba(255,255,255,0.7)",fontSize:13,whiteSpace:"nowrap"}}>{o.nominal}</td>
                  <td style={{padding:"12px 16px",color:"rgba(255,255,255,0.7)",fontSize:13,whiteSpace:"nowrap"}}>{rp(o.price)}</td>
                  <td style={{padding:"12px 16px",color:"rgba(255,255,255,0.5)",fontSize:12}}>{o.phone}</td>
                  <td style={{padding:"12px 16px"}}>
                    <span style={{
                      background:o.status==="success"?"rgba(0,200,83,0.15)":o.status==="pending"?"rgba(255,215,0,0.15)":"rgba(255,68,68,0.15)",
                      color:o.status==="success"?"#00c853":o.status==="pending"?"#ffd700":"#ff6b6b",
                      borderRadius:6,padding:"3px 10px",fontSize:11,fontWeight:700,
                    }}>{o.status==="success"?"✓ Sukses":o.status==="pending"?"⏳ Pending":"✗ Gagal"}</span>
                  </td>
                  <td style={{padding:"12px 16px",color:"rgba(255,255,255,0.4)",fontSize:12,whiteSpace:"nowrap"}}>{o.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── WHATSAPP BUTTON ─────────────────────────────────────────────────────────
function WAButton() {
  const [hov, setHov] = useState(false);
  return (
    <a href="https://wa.me/6281234567890?text=Halo+AbyyStore,+saya+butuh+bantuan" target="_blank" rel="noopener noreferrer"
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        position:"fixed",bottom:24,right:24,zIndex:500,
        background:"linear-gradient(135deg,#25D366,#128C7E)",
        width:hov?56:52,height:hov?56:52,borderRadius:"50%",
        display:"flex",alignItems:"center",justifyContent:"center",
        fontSize:26,boxShadow:`0 4px 20px rgba(37,211,102,0.4)`,
        transition:"all 0.2s",textDecoration:"none",
      }}>
      💬
    </a>
  );
}

// ─── REVIEWS ─────────────────────────────────────────────────────────────────
function Reviews() {
  return (
    <div style={{background:"rgba(255,255,255,0.02)",borderTop:"1px solid rgba(255,255,255,0.05)",padding:"60px 24px"}}>
      <div style={{maxWidth:940,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <h2 style={{fontFamily:"'Orbitron',sans-serif",fontWeight:900,fontSize:26,color:"#fff",marginBottom:8}}>Ulasan Pelanggan</h2>
          <p style={{color:"rgba(255,255,255,0.4)",fontSize:14}}>⭐ 5.0 / 5.0 — Berdasarkan 6.363 ulasan</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:16}}>
          {REVIEWS.map((r,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:20}}>
              <div style={{display:"flex",gap:2,marginBottom:10}}>
                {[1,2,3,4,5].map(s=><span key={s} style={{color:"#ffd700",fontSize:14}}>★</span>)}
              </div>
              <p style={{color:"rgba(255,255,255,0.7)",fontSize:14,lineHeight:1.6,marginBottom:14}}>"{r.text}"</p>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{color:"#fff",fontWeight:700,fontSize:13}}>{r.name}</div>
                  <div style={{color:"rgba(255,255,255,0.3)",fontSize:11}}>{r.game}</div>
                </div>
                <div style={{color:"rgba(255,255,255,0.25)",fontSize:11}}>{r.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{borderTop:"1px solid rgba(255,255,255,0.06)",padding:"40px 24px",textAlign:"center"}}>
      <div style={{fontFamily:"'Orbitron',sans-serif",fontWeight:800,fontSize:22,color:"#fff",marginBottom:8}}>
        Abyy<span style={{color:"#00d4ff"}}>Store</span>
      </div>
      <p style={{color:"rgba(255,255,255,0.3)",fontSize:13,marginBottom:20}}>Platform top up game terpercaya & tercepat</p>
      <div style={{display:"flex",gap:20,justifyContent:"center",flexWrap:"wrap",fontSize:13,marginBottom:20}}>
        {[["faq","❓ FAQ"],["track","📦 Lacak Pesanan"]].map(([p,l])=>(
          <span key={p} onClick={()=>setPage(p)} style={{color:"rgba(255,255,255,0.4)",cursor:"pointer"}}>{l}</span>
        ))}
        <span style={{color:"rgba(255,255,255,0.4)",cursor:"pointer"}}>📜 Syarat & Ketentuan</span>
        <span style={{color:"rgba(255,255,255,0.4)",cursor:"pointer"}}>🔒 Kebijakan Privasi</span>
      </div>
      <p style={{color:"rgba(255,255,255,0.15)",fontSize:12}}>© 2026 AbyyStore. All Rights Reserved.</p>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState("home");
  const [selGame, setSelGame] = useState(null);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("Semua");
  const [toasts, setToasts] = useState([]);

  const addToast = (msg, type="info") => {
    const id = Date.now();
    setToasts(t=>[...t,{id,msg,type}]);
    setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)), 3500);
  };

  const cats = ["Semua","MOBA","Battle Royale","RPG","FPS"];
  const filtered = GAMES.filter(g=>(cat==="Semua"||g.category===cat) && g.name.toLowerCase().includes(search.toLowerCase()));

  const handleGame = g => { setSelGame(g); setPage("topup"); };
  const scrollToGames = () => document.getElementById("games")?.scrollIntoView({behavior:"smooth"});

  if(!loaded) return <LoadingScreen done={()=>setLoaded(true)}/>;

  return (
    <div style={{minHeight:"100vh",background:"#05050f",fontFamily:"'Sora','Segoe UI',sans-serif",color:"#fff"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;800;900&family=Sora:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:6px}
        ::-webkit-scrollbar-track{background:#05050f}
        ::-webkit-scrollbar-thumb{background:rgba(0,212,255,0.3);border-radius:3px}
        input::placeholder{color:rgba(255,255,255,0.25)}
        @keyframes slideIn{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
      `}</style>

      <Navbar page={page} setPage={p=>{ setPage(p); }} />
      <PromoBanner />
      <Toast toasts={toasts}/>
      <WAButton/>

      {page==="home" && (
        <>
          <Hero onScroll={scrollToGames}/>
          <div id="games" style={{maxWidth:1100,margin:"0 auto",padding:"40px 24px 60px"}}>
            <div style={{textAlign:"center",marginBottom:36}}>
              <h2 style={{fontFamily:"'Orbitron',sans-serif",fontWeight:900,fontSize:"clamp(22px,4vw,36px)",color:"#fff",marginBottom:10}}>Pilih Game</h2>
              <p style={{color:"rgba(255,255,255,0.4)",fontSize:14}}>Top up instan untuk {GAMES.length}+ game populer</p>
            </div>
            <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap",alignItems:"center"}}>
              {cats.map(c=>(
                <button key={c} onClick={()=>setCat(c)} style={{
                  background:cat===c?"linear-gradient(135deg,#00d4ff,#7b61ff)":"rgba(255,255,255,0.05)",
                  border:cat===c?"none":"1px solid rgba(255,255,255,0.08)",
                  color:"#fff",borderRadius:8,padding:"7px 16px",cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:600,
                }}>{c}</button>
              ))}
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Cari game..."
                style={{marginLeft:"auto",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:8,padding:"7px 14px",color:"#fff",fontSize:13,outline:"none",fontFamily:"inherit",minWidth:160}}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:16}}>
              {filtered.map(g=><GameCard key={g.id} game={g} onClick={handleGame}/>)}
            </div>
            {filtered.length===0 && <p style={{textAlign:"center",color:"rgba(255,255,255,0.3)",padding:40}}>Game tidak ditemukan 🔍</p>}
          </div>
          <Reviews/>
          <Footer setPage={setPage}/>
        </>
      )}
      {page==="topup" && selGame && (
        <div style={{paddingTop:80}}>
          <TopupForm game={selGame} addToast={addToast} onBack={()=>setPage("home")}/>
        </div>
      )}
      {page==="track" && <TrackOrder addToast={addToast}/>}
      {page==="faq" && <FAQ/>}
      {page==="admin" && <AdminDashboard addToast={addToast}/>}
    </div>
  );
}
