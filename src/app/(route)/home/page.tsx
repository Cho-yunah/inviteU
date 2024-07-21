
// import Slider from './components/Slider';
import Slider from '@/app/components/Slider';
import Link from 'next/link';

export default function Home() {
  return (
    <>
        <div className='p-[1rem]'>
          <p className='text-slate-500 pb-1'>부소개글</p>
          <h1 className='text-slate-900 text-2xl  font-bold pt-2 pb-2 font-[Menlo]'>Invite U</h1>
          <div className='text-slate-400 bg-pink-100 w-100 h-[250px] text-center p-8'>서비스 소개 일러스트</div>
        </div>
        <button className='m-4 p-3 border-2 rounded-3xl shadow-sm'>초대장 만들기</button>
       {true && <Link href='/list' className='m-4 mt-0 p-3 bg-slate-800 border-2 border-slate-800 text-white rounded-3xl'>내 초대장 1</Link>}
        <div className='mt-10 bg-slate-100 h-[400px]'>
          <Slider />
        </div>
    </>
  );
}