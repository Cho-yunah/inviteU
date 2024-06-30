import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
      
        {/* <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div> */}

        <h1 className="text-3xl font-bold pt-2 pb-2">
        Invite U
        </h1>
        <div className='loginBox'>
          <p>
          Make a special invitation, one and only in the world!

          <button className='btn'>소셜 로그인</button>
          </p>
        </div>
      </div>
    </main>
  );
}
