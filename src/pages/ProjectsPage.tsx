import { useLocation } from 'react-router-dom';
import Projects from '../components/Projects'
import PageTransitionWrapper from '../util/PageTransitionWrapper'

const ProjectsPage = () => {
    const location = useLocation();
    const direction = location.state?.direction
    if (!direction) return <Projects />;
    return (
        <div className="overflow-x-hidden">
            <PageTransitionWrapper direction={direction}>
                <Projects />
            </PageTransitionWrapper>
        </div>
    )
}

export default ProjectsPage