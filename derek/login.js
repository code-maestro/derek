// Login function
// document.getElementById('login_btn').onclick = 
function login(e) {
   
  e.preventDefault();

  const email = document.getElementById('typeEmailX').value;
  const password = document.getElementById('typePasswordX').value;

  console.log(email + password);
  // const { user, session, error } = await supabase.auth.signIn({
  //    email: email,
  //    password: password,
  // })
}
