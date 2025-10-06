import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../api/axiosClient'

type KQTim={Search?:{Title:string;Year:string;imdbID:string;Poster:string}[];Response:'True'|'False';Error?:string}
type Phim={Title:string;Year:string;Poster:string;Genre?:string;Director?:string;Actors?:string;Plot?:string;imdbRating?:string;Runtime?:string;Country?:string;Response:'True'|'False';Error?:string}
const KEY='thewdb'

export default function Bai3(){
  const [q,setQ]=useState(''); const [kq,setKq]=useState<KQTim|null>(null); const [tai,setTai]=useState(false); const [loi,setLoi]=useState<string|null>(null)
  const tim=async()=>{if(!q.trim())return;setTai(true);setLoi(null);try{const r=await api.get<KQTim>(`https://www.omdbapi.com/?apikey=${KEY}&s=${encodeURIComponent(q.trim())}`);r.data.Response==='False'?(setLoi(r.data.Error||'Không tìm thấy'),setKq(null)):setKq(r.data)}catch(e:any){setLoi(e?.message||'Lỗi')}finally{setTai(false)}}
  return(<div className='center-box'><h3 style={{textAlign:'center',marginTop:0}}>Tìm kiếm phim</h3>
    <div className='row'><input className='input' placeholder='Nhập tên phim...' value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==='Enter'&&tim()}/><button className='btn' onClick={tim}>Tìm kiếm</button></div>
    {tai&&<p>Đang tải…</p>}{loi&&<p className='error'>{loi}</p>}
    <div className='grid'>{kq?.Search?.map(m=> (<div key={m.imdbID} className='movie'><img src={m.Poster!=='N/A'?m.Poster:'https://via.placeholder.com/200x300?text=No+Poster'} alt={m.Title}/><h4>{m.Title}</h4><p>Năm: {m.Year}</p><Link to={`/bai3/${m.imdbID}`}>Xem chi tiết</Link></div>))}</div></div>)
}

export function ChiTietPhim(){
  const {id}=useParams<{id:string}>(); const [d,setD]=useState<Phim|null>(null); const [tai,setTai]=useState(false); const [loi,setLoi]=useState<string|null>(null)
  useEffect(()=>{if(!id)return;(async()=>{setTai(true);setLoi(null);try{const r=await api.get<Phim>(`https://www.omdbapi.com/?apikey=${KEY}&i=${encodeURIComponent(id)}&plot=full`);r.data.Response==='False'?setLoi(r.data.Error||'Lỗi'):setD(r.data)}catch(e:any){setLoi(e?.message||'Lỗi')}finally{setTai(false)}})()},[id])
  if(tai)return <p>Đang tải…</p>; if(loi)return <p className='error'>{loi}</p>; if(!d)return <p>Không có dữ liệu.</p>
  return(<div className='card'><Link to='/bai3'>← Quay lại</Link><h2>{d.Title} ({d.Year})</h2><div className='detail'><img src={d.Poster!=='N/A'?d.Poster:'https://via.placeholder.com/250x375?text=No+Poster'} alt={d.Title}/><div><p><b>Thể loại:</b> {d.Genre||'—'}</p><p><b>Thời lượng:</b> {d.Runtime||'—'}</p><p><b>Quốc gia:</b> {d.Country||'—'}</p><p><b>Đạo diễn:</b> {d.Director||'—'}</p><p><b>Diễn viên:</b> {d.Actors||'—'}</p><p><b>IMDb:</b> {d.imdbRating||'—'}</p><p style={{marginTop:12}}><b>Nội dung:</b> {d.Plot||'—'}</p></div></div></div>)
}
