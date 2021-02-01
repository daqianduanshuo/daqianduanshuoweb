import { GetStaticProps } from 'next'
import Layout from '../../components/Layout'



const WithStaticProps = ({ items }: Props) => (
  <Layout title="Users List | Next.js + TypeScript Example">
    <h1>Users List</h1>
    <p>
      Example fetching data from inside <code>getStaticProps()</code>.
    </p>
    <p>You are currently on: /users</p>
  </Layout>
)

export const getStaticProps: GetStaticProps = async () => {
  
  return { props: { items } }
}

export default WithStaticProps
