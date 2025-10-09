import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: 'Work',
  description: 'My professional experiences.',
};

export default function Page() {
  return (
    <section>
      <h1 className="mb-4 font-medium text-3xl tracking-tighter">my work</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          
        </p>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />

        <div id='hoek' className="flex align-middle text-center gap-4">
          <div className="grid place-items-center w-12 h-12 overflow-hidden rounded-full bg-slate-50 border-neutral-800 border-1">
            <Image 
              alt="hoek agency logo"
              src={'/work/hoek.png'}
              width={80}
              height={80}
            />        
          </div>
          <div className="flex-col">
            <div className="flex font-medium text-xl tracking-tight">Hoek Agency</div>
            <div className="flex text-neutral-600 dark:text-neutral-400 text-md tracking-tight">
              Software Engineer
            </div>
          </div>
        </div>
        <div className="text-md mt-4 mb-0">
        <p>
          After completing the 1 year co-op at EMG, decided to stay 1 more year during summer 2022 - summer 2023 
          to gain further work experience, especially with a heightened interest in web technology. 
          Joined Hoek Agency who specialized in company branding/brand design, as an internal product developer.
        </p>
          <p>
            A more comprehensive look on what I did at Hoek can be found in my {' '}
            <Link className="underline" href={'/blog/hoek-retrospect'}>retrospect</Link>.
          </p>
          <p className="font-semibold pt-2">
            Key highlights:
          </p>
        <ul className="list-disc ml-4 mt-4 mb-8 text-md">
          <li>
            developed a full-stack application for the company's HR department 
            as co-product lead which delivered <b>10% reduction on operating costs</b>
          </li>
          <li>
            <b>optimized HR workflow by 15%</b>, implementing programmatic automation for manual tasks 
            that were consuming an average of 4 hours weekly
          </li>
        </ul>
        </div>

        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />

        <div id="emg" className="flex align-middle text-center gap-4">        
          <div className="grid place-items-center w-12 h-12 overflow-hidden rounded-full bg-slate-50 border-neutral-800 border-1">
            <Image 
              alt="emg global logo"
              src={'/work/emg.jpg'}
              width={42}
              height={42}
            />        
          </div>
          <div className="flex-col">
            <div className="flex font-medium text-xl tracking-tight">EMG Global</div>
            <div className="flex text-neutral-600 dark:text-neutral-400 text-md tracking-tight">
              Software Engineer
            </div>
          </div>
        </div>
        <div className="text-md mt-4 mb-0">
        <p>
          Worked at EMG Global during summer 2021 - summer 2022
          as a part of the Professional Experience Year co-op program at the University of Toronto.
          Wanted to be back with family during COVID while adding professional experience.
        </p>
        <p>
          Through many hands-on experience at this mobility start-up I was able to quickly learn everything  
          from linux FTP servers, fundamental web development, React.js webapp on Android, as well as a series of EV 
          hardware-software integrations — a big growth from being just an engineering student. 
          More detailed recap of my experience at EMG can be found in my {' '}
          <Link className="underline" href={'/blog/emg-retrospect'}>retrospect</Link>.
        </p>
        <p className="font-semibold pt-2">
          Key highlights:
        </p>
      
        <ul className="list-disc ml-4 mt-4 mb-8 text-md">
          <li>
            delivered the frontend of a pilot provincial project dashboard (smart-city campaign), which 
            contributed in city of Daegu being selected as 1 of 4 finalists out of 20 municipalities to 
            <b> receive $3m USD funding</b>
          </li>
          <li>
            co-led tech stack migration of the smart-city project after finalist selection in modernization efforts, 
            notably from jQuery to React.js and Spring to Spring Boot
          </li>
          <li>
            improved DX by reducing dev server startup time by <b>90% from 30 to 1 second</b> by 
            adopting Vite instead of CRA
          </li>
          <li>
            delivered an Android WebView application that assisted pioneer owners  of the RUTA40 camping EV, 
            driving customer satisfaction <b>from below 50% to 85%+</b>
          </li>
        </ul>
        </div>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />

        <div id="kdic" className="flex align-middle text-center gap-4">        
          <div className="grid place-items-center w-12 h-12 overflow-hidden rounded-full bg-transparent">
            <Image 
              alt="KDIC logo"
              src={'/work/kdic.jpg'}
              width={120}
              height={120}
            />        
          </div>
          <div className="flex-col">
            <div className="flex font-medium text-xl tracking-tight">Korea Defense Intelligence Command</div>
            <div className="flex text-neutral-600 dark:text-neutral-400 text-md tracking-tight">
              Intelligence Specialist
            </div>
          </div>
        </div>
        <div className="text-md mt-4 mb-0">
        <p>
          Carried out a KOR-US intelligence specialist role from 2016 - 2018 during my mandatory military service.
          Being a secure, slow-pace, sure-footing environment had built up inefficiencies within the office and residence.
        </p>
        <p>
          While being careful not to cause security flaws by constantly checking in with the IT department, 
          leveraged MS Office (notably Excel, VBA) and Hangul (JavaScript) to streamline workflow.
        </p>
        <p className="font-semibold pt-2">
          Key highlights:
        </p>
        <ul className="list-disc ml-4 mt-4 mb-8 text-md">
          <li>
            developed automation macros using VBA and JavaScript to minimize repetitive formatting and 
            translations, reducing average minutes per report by <b>67% from 30 to 10</b>
          </li>
          <li>
            cultivated leadership by leading 20 squad members as Lead Sergeant and received a 
            Soldier's Merit of Honour by striving to remove unproductive practices within residence
          </li>
        </ul>
        </div>

      </div>

    </section>
  );
}
