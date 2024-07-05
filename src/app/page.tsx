import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';
import Logo from "../../public/logo.png"

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div className='p-[1rem]'>
          <p className='text-slate-500 pb-1'>부소개글</p>
          <h1 className='text-slate-900 text-2xl  font-bold pt-2 pb-2'>Invite U</h1>
          <div className='text-slate-400 bg-pink-100 w-100 h-[250px] text-center p-8'>서비스 소개 일러스트</div>
        </div>
        <button className='m-4 p-3 border-2 rounded-3xl'>초대장 만들기</button>
        <div className='mt-10 p-[1rem] bg-slate-100 h-[400px]'>
          케러셀 자리
        </div>
      </div>
    </main>
  );
}