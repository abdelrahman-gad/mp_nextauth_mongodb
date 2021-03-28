import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import {useState,useEffect} from 'react';
import {Loader, Form  , Modal  , Grid , Image } from 'semantic-ui-react';
import fetch from 'isomorphic-unfetch';
import {signIn,signOut, useSession } from 'next-auth/client';
import {useRouter} from 'next/router';




const load=() => <Loader active  className="load" />



const Home= (  )=> {
 

  const [session , loading] = useSession();
  const [open, setOpen] = useState(true);
  const [form, setForm] = useState({ _id:'', name: '', email: '' , job:'',company:'',linkedin:'',biography:'' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success,setSuccess] = useState( false );
  console.log('is submitting',isSubmitting);
  const [errors, setErrors] = useState({});
  const router = useRouter();

    useEffect(async ()=>{
     if(session){    
       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users?email=${session.user.email}`);
       const { user } = await res.json(); 
       setForm({...form,...user});
     }         
    },[session]);

    useEffect(() => {
        if (isSubmitting) {          
          updateProfile(); 
          setIsSubmitting(false); 
        }
    }, [isSubmitting])
    
 

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
          const { success } = await res.json();
          setSuccess(true);
          router.push("/");
      } catch (error) {
          console.log(error);
      }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  }

  const handleChange = (e) => {
      setForm({
          ...form,
          [e.target.name]: e.target.value
      })
      console.log(form);
  }


  const profileForm = () => {
    return (
      <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
       
          trigger={<button className="blue" style={{ border:'1px solid #fff' }}>Update Profile</button>}
        
          
        >
          <Modal.Header>Update your profile data</Modal.Header>
          <Modal.Content image>
          <Image src='/mp_gradient_rock.svg'  className="brand-img"  alt="Minority programmers"  />
            <Modal.Description>
             
              { success?<h3 className="success" >your profile was updated successfully</h3>: null }
              {
                       <Form onSubmit={handleSubmit} className="form" >
                            <div  >
                             
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

                             <div className="button-group">
                              <button  type='submit' disabled={isSubmitting} className="blue" >Update Profile</button> 
                              <button  onClick={()=>setOpen(false)} className="yellow" > Cancel </button>
                             </div>
                          </Form>
                  }
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>    
      </Modal.Actions>
    </Modal>
       
    );
  }
  const loggedInView =()=>  (
                                <>
                                

                                <Grid container columns={2} stackable>
                                    <Grid.Column >
                                      <Image src='/mp_gradient_rock.svg'  className="brand-img" alt="Minority programmers"  />
                                    </Grid.Column>
                                    
                                    <Grid.Column>
                                      <h2> Hi {session.user.name} </h2>
                                      <h2> Welcome to minority programmers association  </h2>  
                                    
                                      {  profileForm() }   
                                      <button className="yellow" onClick={signOut}>Sign Out</button>
                                    </Grid.Column>
                                  </Grid>

                                </>
                              ) 

  const loggedOutView = ()=> (
                                <> 
                                 <Grid container columns={2} stackable>
                                   <Grid.Column >
                                     <Image src='/mp_gradient_rock.svg'   className="brand-img"  alt="Minority programmers"  />
                                   </Grid.Column>
                                   <Grid.Column>
                                   <h2> Welcome to Minority Programmers Association </h2>
                                  <button className="yellow" onClick={signIn}>Sign In</button>
                                   </Grid.Column>
                                 </Grid>                          
                                </> 
                              )    

  const views=() =>  (
                        <div className={styles.container}>
                          <Head>
                            <title>Minority Programmers Association</title>
                            <link rel="icon" href="/" />
                          </Head>
                          <main className={styles.main}>
                            {session?loggedInView():loggedOutView()}
                          </main>                  
                        </div>
                      ) 

  {  return  loading?load():  views() }
 
}

export default Home;