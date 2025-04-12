import Image from "next/image";
import Link from "next/link";

export default function ShopPage() {
  const designers = [
    {
      id: 1,
      avatar: '/ava.png',
      name: 'ТАІЦЬКА КАТЕРИНА',
      nicname: 'tai.tss',
      regDate: '29/03/2025',
      works: 3,
      finishedProjects: 1
    }
  ]

  return (
    <section className="flex flex-col items-center">
      <h1 className="text-center font-bold text-[40px] text-GRAY mb-11">НАШІ ДИЗАЙНЕРИ</h1>
      <ul>
        {designers.map((designer) => (
          <li key={designer.id} className="flex items-start gap-4">
            <div className="flex">
              <Image src={designer.avatar} alt={designer.name} width={127} height={127} className=" object-cover rounded-full shadow-md" />
            </div >
            <div className="pt-[10px] flex flex-col">
              <h2 className="text-2xl mb-4">{designer.name} | <span className="text-ROZA font-bold">{designer.nicname}</span></h2>
              <Link href={`/designers/${designer.id}`} className="text-GRAY font-bold w-56 h-10 py-6 ml-9 border-2 flex items-center justify-center border-GRAY rounded-lg transition-all ease-linear duration-300 bg-white hover:bg-GRAY hover:text-white">ПРОФІЛЬ ДИЗАЙНЕРА</Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
