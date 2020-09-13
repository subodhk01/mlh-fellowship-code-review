function Template(props){
    return <></>
}

export async function getServerSideProps(context) {
    const slug = context.params.slug
    console.log(slug)
    context.res.writeHead(301, {
        Location: `/space/${slug}`
    });
    context.res.end();
    return;
}

export default Template;
