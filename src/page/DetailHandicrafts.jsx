import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { Button, Card } from 'antd';
import useHandicraft from '../hooks/use-handicrafts';

const DetailHandicrafts = () => {
   const { handiId } = useParams();
   const { isLoading, handicraft } = useHandicraft(handiId);
   const navigate = useNavigate();

   return (
      <>
         <Header />
         <div className="max-w-6xl mx-auto">
            <div className='mt-10 mx-5 my-5'>
               <Button className='mb-5' onClick={() => navigate(-1)}>Back</Button>
               <Card loading={isLoading}>
                  <h1 className='text-lg uppercase'>{handicraft?.name}</h1>
                  <img
                     src={handicraft?.photo_url}
                     alt={handicraft?.name}
                     className='object-cover'
                  />
                  <p className='mt-5 text-lg'>Description : {handicraft?.description}</p>
                  <div>
                     <p>Langkah-Langkah :</p>
                     <ol className="list-decimal ml-10">
                        {handicraft?.steps.map((step, index) => (
                           <li key={index}>{step}</li>
                        ))}
                     </ol>
                  </div>
                  <p className='mt-5 text-lg'>tags: {handicraft?.tags.join(',')}</p>


               </Card>
            </div>
         </div>
      </>
   )
}

export default DetailHandicrafts