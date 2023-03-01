import Head from 'next/head'
import Image from 'next/image'
import KonstaComponentTest from '@/components/KonstaComponentTest'
import TailwindTest from '@/components/TailwindTest'
import MUITest from '@/components/MUITest'
import Layout from '@/components/Layout'

export default function Home() {
  return (
    <>
      <Layout>
        <KonstaComponentTest />
        <TailwindTest />
        <MUITest />
      </Layout>
    </>
  )
}
