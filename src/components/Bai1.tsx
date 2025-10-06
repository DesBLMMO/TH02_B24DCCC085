import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../api/axiosClient'

type QuocGia={name:{common:string;official?:string};flags:{png?:string;svg?:string;alt?:string};population:number;region:string}
type QuocGiaChiTiet=QuocGia&{capital?:string[];subregion?:string;languages?:Record<string,string>;maps?:{googleMaps?:string}}

export default function Bai1(){
  const [ds,setDs]=useState<QuocGia[]>([])
  const [q,setQ]=useState('')
  const [tai,setTai]=useState(false)
  const [loi,setLoi]=useState<string|null>(null)
  useEffect(()=>{(async()=>{setTai(true);setLoi(null);try{const r=await api.get<QuocGia[]>("https://restcountries.com/v3.1/all?fields=name,flags,population,region");setDs(r.data.sort((a,b)=>a.name.common.localeCompare(b.name.common)))}catch(e:any){setLoi(e?.message||'Lỗi')}finally{setTai(false)}})()},[])
  const loc=useMemo(()=>q?ds.filter(x=>x.name.common.toLowerCase().includes(q.toLowerCase())):ds,[ds,q])
  return(<div className='card'>
    <input className='input' placeholder='Tìm quốc gia...' value={q} onChange={e=>setQ(e.target.value)}/>
    {tai&&<p>Đang tải…</p>}{loi&&<p className='error'>{loi}</p>}
    <div className='grid' style={{marginTop:16}}>{loc.map(c=>(
      <div key={c.name.common} className='country'>
        <img src={c.flags.png||c.flags.svg} alt={c.name.common}/>
        <h4>{c.name.common}</h4><p>Region: {c.region||'—'}</p><p>Population: {c.population.toLocaleString()}</p>
        <Link to={`/bai1/${encodeURIComponent(c.name.common)}`}>Xem chi tiết</Link>
      </div>))}</div></div>)
}

export function ChiTietQuocGia(){
  const {name}=useParams<{name:string}>()
  const [d,setD]=useState<QuocGiaChiTiet|null>(null)
  const [tai,setTai]=useState(false)
  const [loi,setLoi]=useState<string|null>(null)
  useEffect(()=>{if(!name)return;(async()=>{setTai(true);setLoi(null);try{const r=await api.get<QuocGiaChiTiet[]>(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=true`);setD(r.data?.[0]||null)}catch(e:any){setLoi(e?.message||'Lỗi')}finally{setTai(false)}})()},[name])
  if(tai)return <p>Đang tải…</p>; if(loi)return <p className='error'>{loi}</p>; if(!d)return <p>Không có dữ liệu.</p>
  return(<div className='card'><Link to='/bai1'>← Quay lại</Link><h2>{d.name.common}</h2>
    <img src={d.flags.png||d.flags.svg} alt={d.name.common} style={{maxWidth:220,borderRadius:8}}/>
    <ul><li>Tên chính thức: {d.name.official}</li><li>Thủ đô: {d.capital?.join(', ')||'—'}</li><li>Khu vực: {d.region} / {d.subregion}</li><li>Dân số: {d.population?.toLocaleString()||'—'}</li><li>Ngôn ngữ: {d.languages?Object.values(d.languages).join(', '):'—'}</li>{d.maps?.googleMaps&&<li><a href={d.maps.googleMaps} target='_blank'>Google Maps</a></li>}</ul></div>)
}
