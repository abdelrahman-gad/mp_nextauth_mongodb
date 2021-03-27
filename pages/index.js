import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import {useState,useEffect} from 'react';
import {Loader, Form , Button ,Modal ,Header,Image } from 'semantic-ui-react';
import fetch from 'isomorphic-unfetch';
import {signIn,signOut, useSession } from 'next-auth/client';
import {useRouter} from 'next/router';




const Home= (  )=> {

  const [session , loading] = useSession();
  const [open, setOpen] = useState(true);
  const [form, setForm] = useState({ _id:'', name: '', email: '' , job:'',company:'',linkedin:'',biography:'' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState({});
  const router = useRouter();

    useEffect(async ()=>{
     if(session){
     
       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users?email=${session.user.email}`);
       const {user} = await res.json();
     
       setForm({...form,...user});
   
     }
     
       
    },[session]);

 
   
 

    const updateProfile = async () => {
  
      try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${form._id}`, {
              method: 'PUT',
              headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(form)
          })
          router.push("/");
      } catch (error) {
          console.log(error);
      }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    updateProfile();
    setIsSubmitting(false); 
  }

  const handleChange = (e) => {
      setForm({
          ...form,
          [e.target.name]: e.target.value
      })
      console.log(form);
  }




  const profileForm =()=>{
    return (

      <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button>Show Modal</Button>}
        >
          <Modal.Header>Update your profile data</Modal.Header>
          <Modal.Content image>
            <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
            <Modal.Description>
              <Header>Default Profile Image</Header>
              {
                      isSubmitting
                          ? <Loader active inline='centered' />
                          : <Form onSubmit={handleSubmit} >
                            <div style={{ border:'1px solid #333' , display:'flex'  }}>
                            <div>
                                <Form.Input
                                    
                                    // error={errors.name ? { content: 'Please enter a valid name ', pointing: 'below' } : null}
                                    label='Name'
                                    placeholder='name'
                                    name='name'
                                    value={form.name}
                                    onChange={handleChange}
                                />
                                <Form.Input
                                    
                                    // error={errors.name ? { content: 'Please enter a valid name ', pointing: 'below' } : null}
                                    label='Email'
                                    placeholder='email'
                                    name='email'
                                    value={form.email}
                                    onChange={handleChange}
                                />
                                <Form.Input
                                    
                                    // error={errors.name ? { content: 'Please enter a valid name ', pointing: 'below' } : null}
                                    label='job'
                                    placeholder='Name'
                                    name='job'
                                    value={form.job}
                                    
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                            <Form.Input
                                
                                //  error={errors.name ? { content: 'Please enter a valid name ', pointing: 'below' } : null}
                                label='Company'
                                placeholder='company'
                                name='company'
                                value={form.company}
                                onChange={handleChange}
                            />
                              <Form.Input
                                
                                //  error={errors.name ? { content: 'Please enter a valid name ', pointing: 'below' } : null}
                                label='Linkedin url'
                                placeholder='linkedin url'
                                name='linkedin'
                                value={form.linkedin}
                                onChange={handleChange}
                            />
                            <Form.TextArea
                                
                                label='Biography'
                                placeholder='biography'
                                name='biography'
                                //  error={errors.description ? { content: 'Please enter a description', pointing: 'below' } : null}
                                value={form.biography}
                                onChange={handleChange}
                            />
                            </div>
                            
                            </div>

                            
                              <Button type='submit'>Update Profile</Button> 
                              <Button  onClick={()=>setOpen(false)} > Cancel </Button>
                          </Form>

                  }
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
        
      </Modal.Actions>
    </Modal>



          
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Minority Programmers Association</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
         {
          !session && (
            <>
              Not Signed In 
              <button onClick={signIn}>Sign In</button>
            </>
          ) 
         }

       
        {
         
      

          session && (
              <>
                 
              {  profileForm() }
                Signed In as {session.user.email} ,Access private pages
                 
                <button onClick={signOut}>Sign Out</button>
              </>
            ) 
               
        }
      </main>
      
    </div>
  )
}

export default Home;
