export default function ProjectList({setActiveProject}) {

    const projects = [
        {
            title: 'Project 1',
            img: '/images/1.jpg'
        },
        {
            title: 'Project 2',
            img: '/images/2.jpg'
        },
        {
            title: 'Project 3',
            img: '/images/3.jpg'
        },
        {
            title: 'Project 4',
            img: '/images/4.jpg'
        },
        {
            title: 'Project 5',
            img: '/images/5.jpg'
        },
    ]

    return (
        <div className="relative mix-blend-difference z-10 text-white h-screen w-full">
            <ul className="border-b" onMouseLeave={() => setActiveProject(null)}>
                {
                    projects.map((project, index) => (
                        <li key={index} className="text-[4vw] p-5 border-t" onMouseOver={() => setActiveProject(index)}>
                            <h2>{project.title}</h2>
                        </li>
                    ))
                }
            </ul>
        </div>
    )

}