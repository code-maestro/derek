// Sign up

var SUPABASE_URL = 'https://ernhobnpmmupjnmxpfbt.supabase.co'
var SUPABASE_KEY =
   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxMzA5ODU0NCwiZXhwIjoxOTI4Njc0NTQ0fQ.Z9bRrfaL2oGhSuyBckFcdcnRIJDelWJ1II98OnEtLO0'

const options = {
   schema: 'public',
   headers: { 'Access-Control-Allow-Origin': '*' },
   autoRefreshToken: true,
   persistSession: true,
   detectSessionInUrl: true
}

var supa = supabase.createClient(SUPABASE_URL, SUPABASE_KEY, options)

window.userToken = null

console.log(supa);

document.getElementById('signup_btn').onclick = async function signup() {
   const email = document.getElementById('typeEmailX').value;
   const password = document.getElementById('typePasswordX').value;
   const password2 = document.getElementById('typePassword2').value;

   if (password !== password2) {
      alert('Passwords do not match');
      return;
   } else {
      const { user, session, error } = await supa.auth.signUp(
         {
            email: email,
            password: password2,
         }
         // {
         //   data: {
         //     name_name: 'John',
         //   }
         // }
      )
      console.log(user);
   }
}


// const button = document.querySelector('.btn')
// const button2 = document.querySelector('.btn2')
// const form = document.querySelector('.form')

// button.addEventListener('click', function () {
//    form.classList.add('form--no')
// });