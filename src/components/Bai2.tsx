import { useEffect, useMemo, useState } from 'react'
import api from '../api/axiosClient'

type TyGia={result:string;base_code:string;rates:Record<string,number>}
const PHO_BIEN=['USD','EUR','VND','JPY','CNY','GBP','AUD','CAD','KRW']

export default function Bai2(){
  const [donViGoc,setDonViGoc]=useState('USD')
  const [soTien,setSoTien]=useState(1)
  const [bang,setBang]=useState<Record<string,number>>({})
  const [donViDich,setDonViDich]=useState('VND')
  const [tai,setTai]=useState(false)
  const [loi,setLoi]=useState<string|null>(null)
  const dsMa=useMemo(()=>Object.keys(bang),[bang])
  useEffect(()=>{(async()=>{setTai(true);setLoi(null);try{const r=await api.get<TyGia>(`https://open.er-api.com/v6/latest/${encodeURIComponent(donViGoc)}`);if(r.data.result==='success'){setBang(r.data.rates);if(!r.data.rates[donViDich])setDonViDich('USD')}else setLoi('Không lấy được tỉ giá')}catch(e:any){setLoi(e?.message||'Lỗi')}finally{setTai(false)}})()},[donViGoc])
  const kq=useMemo(()=>soTien*(bang[donViDich]||0),[soTien,donViDich,bang])
  return(<div className='center-box'><h3 style={{textAlign:'center',marginTop:0}}>Quy đổi tiền tệ</h3>
    <div className='row'><label>Đơn vị gốc:</label><select value={donViGoc} onChange={e=>setDonViGoc(e.target.value)}>{[...new Set([...PHO_BIEN,...dsMa])].map(x=><option key={x}>{x}</option>)}</select>
    <label>Đơn vị đích:</label><select value={donViDich} onChange={e=>setDonViDich(e.target.value)}>{dsMa.map(x=><option key={x}>{x}</option>)}</select>
    <label>Số tiền:</label><input type='number' className='input' value={soTien} min={0} onChange={e=>setSoTien(+e.target.value)}/><button className='btn' onClick={()=>setDonViGoc(donViGoc)}>Quy đổi</button></div>
    {tai&&<p className='error'>Đang tải tỉ giá…</p>}{loi&&<p className='error'>{loi}</p>}{!tai&&!loi&&<p className='result'>{soTien} {donViGoc} = <b>{kq.toLocaleString()}</b> {donViDich}</p>}</div>)
}
