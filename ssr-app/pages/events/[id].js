import React from 'react'
import {useRouter} from 'next/router'
import Event from "../../components/event";
//import {addApolloState, initializeApollo} from "../../lib/apolloClient";
//import {eventQuery} from "../../queries/event-query";

function EventPage() {
    const router = useRouter()
    return (
        <div>
            <Event id = {router.query.id}/>
        </div>
    )
}

/*
export async function getStaticProps(conext) {
    const apolloClient = initializeApollo()

    await apolloClient.query({
        query: eventQuery,
        variables: {
            $id_var: conext.params.id
        }
    })

    return addApolloState(apolloClient, {
        props: {},
        revalidate: 1,
    })
}
*/


export default EventPage
