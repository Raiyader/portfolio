import { useLocation } from 'react-router-dom';
import Home from '../components/Home'
import PageTransitionWrapper from '../util/PageTransitionWrapper'

const HomePage = () => {
    const location = useLocation();
    const direction = location.state?.direction ?? "none";
    if (!direction) return <Home />;
    return (
        <div className="overflow-x-hidden">
            <PageTransitionWrapper direction={direction}>
                <Home />
            </PageTransitionWrapper>
        </div>
    )
}

export default HomePage