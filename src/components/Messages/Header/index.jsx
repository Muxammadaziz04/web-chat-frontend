import { useDispatch, useSelector } from 'react-redux';

import contactActions from '../../../redux/actions/contactInfoAction.js'
import dropIcon from '../../../Assets/3dot.svg'

import style from './Header.module.scss'

const MessagesHeader = () => {
    const dispatch = useDispatch()

    const { openContactInfo, closeContactInfo } = contactActions

    const isOpen = useSelector(state => {
        const { isOpen } = state.contactInfoReducer
        return isOpen
    })

    const toogleContactInfo = () => {
        dispatch(isOpen ? closeContactInfo() : openContactInfo())
    }

    return (
        <div className={style.header}>
            <span className={style.header__block}>
                <div className={style.header__img}>
                    <img
                        src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBIVFRgSFRIYGBgYGBgYGBgSGBgSGBoYGBgaGRgYGBgcIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QGhISHDQhISE0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0MTQ0NDQ0NDQ0NDQxNDQ0NDExNDQ0NDQ0NDE0PzQ0NP/AABEIALcBEwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAAAQIFBgQDB//EAD0QAAEDAgQDBgQEAwcFAAAAAAEAAhEDBAUSITFBUWEGInGBkaEyscHwE0JS0RRi4SMzgpKisvEHFWNy0v/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgME/8QAHxEBAQEBAAIDAQEBAAAAAAAAAAECESExAxJBMiIT/9oADAMBAAIRAxEAPwCxQhCqGEwkmgYTSCYVAglJcmK3Ap0nv6QPE6KW8WMx2nxY5ixp2ECOHM+PBZik+O8eOg6/0UbqtneSToNz9FzPfPT6D91w9+XX07al0Sd9BHnzU23ziYnXlwHiqtz0NdwV4daexu2gj8x57gfv8lf2l4XaN9Vh7apzMDj1Wkwx5cR+UDXSduZ5nh5qVqNK1uk5o5nj032XnXexjQ4kidpBJP8A6jcoBa0ZnCT+VpPu48/voOqww8vOd+pnSRp0yt/fVYt43J1VyIzP7rf/ACuygzyaPi8lyV7Wm/4WvPLK0sb/AKtCt7b9mA45nd3ru71VjR7M027E+az2ryT2+Y4fQLHFrmnK4RqACPMaeq9sWwh72EMgFs5hpqOBX0d2ANG2vjqq66sMrthoOI+4VmrPZcy+nybBcZqWdQsqA/huPeA1yn9TR8wvo9Gq17Q9jg5rhILTIIPEFYrtbhrQ4ujfxhV3ZTGXW9QU3Omi8wQfyOOz29J39V3xrrz6zY+kITSXVzCSaSgRUVIpIIlIplIoIlIplBQRUSpFRKCKEIUHQmoqSoaaSaoYTUU5QMLI9t8QgNotOu5+n1WqqPygk8F8wxW6z1H1CdATC57vjjeZ56rqndEDz8TzXg4oLvzTuvJzvRZkW1Iu4qQKgBxKY++ao67ZskT9/utNh1wWwxm5MEjUz+lvXrw9Ss1bMJIA3204Ledm8EL4nTSPLeB04k8dOQXLV465nVjhVm57hPePJvwgePFb3C7AMAMaqGE4c1jdArloXOTrpbycj0YF6QoNXpK6yONrycvGrSa7cL2eoErOmsqm/wACt6oIfTB68fVfJO2vY7+GP4jJcxx/ynkdF9vKp8etG1ab6Z2cCPPgVmXjfOvn3ZDETVoBrjLmHIZ3IHwk+XyV6sR2eLre7fRds8Ef4m7exK28r1YvY8upyhBQgrbKJSUlFQIqJUiooEUigoKCJSKZUSgSEQhB6ymEgFJFNMJJqoaaSCgp+0t1kouPEiB57+y+Z3z4AZxOpWy7Z3MvZT5CT9+iosL7KXt3NWlSGX8rnuazNH6Z1PjsuNs75/HXMvPDPvd+ybWrvxXDxbuYwul5aS9pblyOkjKDMO2mVwEHirPM7Es5eUxr96KTBrA3UASdNvdajszgDqxBju+58eimrxc57Xt2XwWpUeMrdOLvovr2EYU2m0Tqfb+q58IsGUmBrQrb+Ia34jHkSvPb16JOR302r3YFRjGRMMpud1dAHlqm/ELrcU46Fun+b+nBdM8Z1K0ACk5ZU9oqrTD6YbyzaSeU7fJdVh2npVNCCx3J23kVrsjH1tXLyvMuUTcA7FQLli1uR6Fy47oSF1LxuDos2NR8h7aUvwbqlWG2dhPhmylawBVH/Ua1llN3H8RjP87wrhej4v5ef5fZJFNBXVyRKRUiolQIqJUkigiUimUigRUUykUEYQhCD2TCSaBhNIJqhpOKYXNfVMrHO6FRWHvh+Pc5OD3hnl+aPKVdW3aW4Y/Kyk3IzRrdWyG6achH0WcsrwU7ijVdsKrXO6NJhx9CfRfS6ODsp1alUnM3LLZEABxMD0AXk159vX8fiVje3V6bxlOsGFpYHNcDrroY6j+qwmQlfRb2vTeX02jcz0nj9FlLiwgkAfRbzrk4xrPb1z4Ph34j2g819lwWyaxjQBwWB7JWXfBIX1G0ZoFj5Ndb+PPHq3ReT3jj7rtFKQq2+ouGyzG3SzEGM5BQqdpKTdC8TyWVxOo5olwfH6abSXu6DkOqy152qu6L2sDW29EloeaLGvqBrtSczt3gcV0zm1nWs59vpFftDbP7hc0k8DH1VRcUwHZmbH5HdV+DturulUq/xD3Q+GtrsY4OY4ZmhwDe6d5g8lYYZTkFuXIR3XsmQ13NnHKd44JvNzOmNZ0tMKuX8Tp9hXjavNVOGWLgdQrK+ZkYXEwACVzi3iN5ijGAlxgLPXfbSk2Q1pcduQWJxnGX1HF05WAwC5wYPVx9goWFem2HOYx/HuvaTHMNJBPlK6TN9s2z0s8Zxk3LWMezK0VabwQJ+B4J5bgFaOVSWmIUrlzabaejZJBEQBpB840V2u3x+nn+T2EISXRzCipKJQIqKkVFQIpFMpFAiolSUSgSEIQeqYSQFRJNJMICVWY8+KL/AAKslUdpP7k+Kzr0ufbBVqGcuHANPyO3nC+rYHUdXsmEmSaFInyBa73C+a0GHK8xuIHiTv7Ba/8A6dYmzL/CvdlfTLizX4mPMlscQCYjwXDX8vTi/wCnlitgxgDmiOJjmvC8s+415jVoPDiFr8SsGuLgSGB3wuIlk8jyWUu7WtSb+E8tInuFpmRxHht6rn3rrZ4dOANDStnZ1pCxGGSForCvCzpc+mvttV7PtgVW2VwrejUBCub1jUsUmJYUHtj7lZnErGmSBcUXSB8dMhpIG0yCD7HqvoxYCvGpaNO4XTl/Gey+Kx9he2tNn4bGvjlAkk8TBMnTkrjC8PYXfiZC1xBBzcQTPeHy5KxZYsB0aB4CF2U2BoVvdezszP8AKP4IB0C5Mats9F7ebf8Ald0oOoIUsZ7XxfGuzV3TqfxNHI5wlolrajWNczKYYQcoEmDHLVeb7NjLB9OoMz8xcyR3h3QTlHDUEr6TiuHB4OVxa4bObp5FZDErW6nI95LTpprIVzvns18ffMVfZKwqU2Zngy+HEy3UEaTxO/utMo0WZWtbyAHoFJeiennvsJJlJVAolSKiUCKipFRUCKRTKRQJRKkVEoEhCEHpKaSaoaJSCaBqp7Qsmmfvf/lWyr8aH9k7oJ9ws69Ln2yFs0Zf8QPoD+y9bnDnZRUpOLajIcwt0MiZB6Lxt3RI/SG/VXTXw0R0+RC4W8j0SdrwodvTUpijUYRUByugkNdH+3byUv8AudKqTlIa4vcQzPnLWHYBx1IE76SIKrqeG0jWe9zZdGamA4shwDIf3TJjXTn4Qa5tDLdBwJJLszpMkucTJJ6qWZvpZrX63FtTiF3tkLnsxoF3ZFz065d9pddVc212su2QrG2eVz9OnOtTQupXUHyqG3rKwpVV1zpy1iO4uUXvXg6rC4rq6ytLjsFq6ZmXd+Kvak5UlXHrZjcz6jWDm4ho9142nai3frSqNeB+gh3rCkq3K2uGw6eBXBdWrTqvKrjdNzmsBlznQAOgkn0BXlil1DDrrHBSnpU1QMxjmVBJuya9k8SPHq9tCSEKoRSQUKCJSTKRQRKCgoKCJSKZSKBShEoQegKEk1QwmopoJLmv6edjm82n5aL3ScFKsYB0S482z6b+4Xf+N3WnhH+12Y+3zXDk/talPkXR65lJhP4YjdpIjnvI/wBIHmvPZ+O8qdxSDyw/mbVY3ctkPMO1G2hOq5cQysu+44uYMga58l5DO53idSe6fKBwXVYVG52Zj3Q9hLtyA0gtd4xqp9q6jX1KNRuXvPuM+UEQ51QPy6jWMwg8iFrPnKX+mtt3DQjY6qzoxCymF3stAPBaK0rgrhY7yul9PVe9FQLgUAwscdJXfQcu+nUVVTevZlbqrPCXytSSdlN9m17Cx2zhB4e6p2YoxpiVYUsSYG5nPa0fzEBajF7+M3ediGuJzPzjgKgmPRYzFcNqWz3fhME/CXgQYPDRfTa/au1GjX5z0IAVZd41ZOY4u1J4SJnxV9NSas8xSdkaZDDUeO+QRJ4CdhOysbm4zvDeA1P0Vc3E6bW9wy0zHlpBXphRlpefzH2G31W8Z7px+TXM8dyEIXqeUJFCSASKaRUCKiU0kCKRTKRQIqJTKRQJCEIJpqKkgYQkmgaRQhUYnFW5LrOPzSPYa+6VQd5zQNXAOb1O489NVLGnB1R2vwv9i0grzuHnKKg+JhDv/ofP1Xmvt6J6V9tVyvLDxlzeHGSPIk+R6Lzu31HVWsdMMLnCTmnPlkz4Nb6Ivmd+W6B3eYeRPBdNi/OYcO8PUa6+I4p9uHOuhjyx8cCtBY3vVV95Z5mghctB5boVj26emzoXUrqbU03WVoXJHFWFG7Usaml8ysis1zxDd1wUKsq3s28VlpS3HZh7gXOuajT/ACZdPIgqtf2QY/e9qk/zZSPkt7lkLO4vg1Ykup6HlMStZ0ueT3GRvuxNRgll1m5AqrqdmruO9UEDwKva1DFGn+7kDzUKFveVHRUlrQZd16Lc0urjn6rrS3dTZ3jJA0HDVbPDqeWmxv8AKPfVZapUD62QbAj5x+62DBAhdce3i+RNCSF1cghCSASQUlAihCRQBUSmUigSRTUSgEIQglKJUZTlFSlNQUgiJJFEoQYbtMHMrF0aENjrGp+Srad9oJO+h8efqF9Fr21N8Z2B0GRInVUnaLDKZpjKxrTJktAG/P0XO4/XSaY24fMN6mJ4anT1le9G4cHse3Vw356bg+vmvJmEPLu7Pz+9x6q2suzVcEOcJbvLd94lY1nw3nXlqbCrTrMkDKeLToZ477hV+IWEagLQ4XaNawNj1XtdWkjZcZeV3YIvcwr2p33P2XdieHkSYWersLSukc74aK2v+RlaHD8XbsSvmhrkcV0UsUe3jPilz1Zrj7HbXjDxXeLlg1kL5LhWMVHvFNkhxkiSI04aqyu727aILXRzbB+qz9Kv3j6BUv6cxIWd7VYtTpUHvESGmPE6AesLM02XRBeMx5zv6Kt7U4Vcvaw5i8fmaOfA9VvPx3vazr5JzkVuA1/7RsmZyz4zMr6YF8lwqnUFQaEERw5L6tb1MzQemq6Y8WuO/UeqSJSK6OZpSkhAJEoSQCChJAFRTKSBJFCRKAQlKEVJCjKaBphRTBQSRKSUoJyuTEmyyOoXTK97ez/EOo0HzQUVhYukGD8XXmD9FfW1Z7MrXAAaROo+EAA+blb07NrRpv8AZ4/eqhVtGu3HL5taI9CrxHnZ16bgJaPhZt1Ou3FdVSg07HnpqeMQqapaOae4TEjoficpMu3t4nzMbnqs3Gb7jWdanqpX+GuM92dxprqsZiuHkT3SPELcf9ykeu+m+hXhWuWuGoERs4SNsoH1Wf8AlPxv/rf18nuqULhe4hfRcUw2g+SGDy6CD7rLXuDN1ifuP3U+lh9ozVSsQ4QSCNQRoQeC+l9k8YdcU8j9XsAk/qHA+KwhwoB06lazsbalr3vjTLHmSP2Wp4YrXoKUolbZeQtaczkbPOF6gIlJQNEpIQOUkkIGkhBKAlIoKigCkUFJAkimUigEJIQCcpShFAKlKimgkokIlSYCSANzog9LekXuDR9haWytg3SBHovLD7AMbPHif26KwawAc9fsdCfkrEQqN5855iP6n5KBYOevsYzHTzC9mu4T1nfYau8th5Iezlptpynh6D3VFdVo+0ewmfdctW1afEcdzoFZObPnw8T+wXOaRPhx4j38EFNWtY5aeW3suCrbP/Lry47be8laRzGyOO3WNyuZ9Dhp5QOE/VBkbim8Tv5j0n3PoqyvOu4+/vz8Frb+230Hr6fJqzt7T++P3x9VKK+2tS94YNzz4cz98lr7S1bTYGNG255nmVnMNrim/MWzIjqFoLe8pv8Ahd5HQqK6ZQlKcogQiUICUIKJQCJSlCBpFKUigaRKEigRKRTKigEkFBQEoSlCAQhCKcolCEArPCLcGXk7aD900INBSEbL2G23Tz5eHM8UIVRBw+YE+G8chsEmkj5683GAhCBvE8NO9t0hg+q8KrYnlr7d0IQqOV4E7aGfnH0XO+ZJgH7JPyQhBxV2Zhry+g/YKixC1GwQhBVilqpuokd4IQsVVjZ3DhoddJ8uis6feEhCEAiUIVQJFCEBKEIQJCEIFKiUIQJBQhAikUIQKUIQoP/Z"
                        alt='prifile img'
                    />
                </div>
                <span>
                    <p className={style.header__name}>Lara Mueller</p>
                    <p className={style.header__status}>Last seem 2 hour ago</p>
                </span>
            </span>
            <span className={style.header__block}>
                <button className={style.header__btn} onClick={toogleContactInfo} >
                    <img src={dropIcon} alt="3 dot icon" />
                </button>
            </span>
        </div>
    );
}

export default MessagesHeader;
