import App from '../components/App'
import EventList from "../components/event-list";
import {allEventsQuery} from "../queries/all-events-query";
import {addApolloState, initializeApollo} from "../lib/apolloClient";

const IndexPage = () => (
  <App>
      <EventList/>
  </App>
)

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: allEventsQuery
  })

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  })
}

export default IndexPage
