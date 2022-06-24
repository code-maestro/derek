// // var SUPABASE_URL = 'https://ernhobnpmmupjnmxpfbt.supabase.co'
// // var SUPABASE_KEY =
// //    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxMzA5ODU0NCwiZXhwIjoxOTI4Njc0NTQ0fQ.Z9bRrfaL2oGhSuyBckFcdcnRIJDelWJ1II98OnEtLO0'

// // var supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
// // window.userToken = null

// // document.addEventListener('DOMContentLoaded', function (event) {
// //   var signUpForm = document.querySelector('#sign-up')
// //   signUpForm.onsubmit = signUpSubmitted.bind(signUpForm)

// //   var logInForm = document.querySelector('#log-in')
// //   logInForm.onsubmit = logInSubmitted.bind(logInForm)

// //   var userDetailsButton = document.querySelector('#user-button')
// //   userDetailsButton.onclick = fetchUserDetails.bind(userDetailsButton)

// //   var logoutButton = document.querySelector('#logout-button')
// //   logoutButton.onclick = logoutSubmitted.bind(logoutButton)
// // })

// // const signUpSubmitted = (event) => {
// //   event.preventDefault()
// //   const email = event.target[0].value
// //   const password = event.target[1].value

// //   supabase.auth
// //     .signUp({ email, password })
// //     .then((response) => {
// //       response.error ? alert(response.error.message) : setToken(response)
// //     })
// //     .catch((err) => {
// //       alert(err)
// //     })
// // }

// // const logInSubmitted = (event) => {
// //   event.preventDefault()
// //   const email = event.target[0].value
// //   const password = event.target[1].value

// //   supabase.auth
// //     .signIn({ email, password })
// //     .then((response) => {
// //       response.error ? alert(response.error.message) : setToken(response)
// //     })
// //     .catch((err) => {
// //       alert(err.response.text)
// //     })
// // }

// // const fetchUserDetails = () => {
// //   alert(JSON.stringify(supabase.auth.user()))
// // }

// // const logoutSubmitted = (event) => {
// //   event.preventDefault()

// //   supabase.auth
// //     .signOut()
// //     .then((_response) => {
// //       document.querySelector('#access-token').value = ''
// //       document.querySelector('#refresh-token').value = ''
// //       alert('Logout successful')
// //     })
// //     .catch((err) => {
// //       alert(err.response.text)
// //     })
// // }

// // function setToken(response) {
// //   if (response.user.confirmation_sent_at && !response?.session?.access_token) {
// //     alert('Confirmation Email Sent')
// //   } else {
// //     document.querySelector('#access-token').value = response.session.access_token
// //     document.querySelector('#refresh-token').value = response.session.refresh_token
// //     alert('Logged in as ' + response.user.email)
// //   }
// // }

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ernhobnpmmupjnmxpfbt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxMzA5ODU0NCwiZXhwIjoxOTI4Njc0NTQ0fQ.Z9bRrfaL2oGhSuyBckFcdcnRIJDelWJ1II98OnEtLO0'
)

async function getTodos() {
  let { data, error } = await supabase.from('farmas').select('*')
  return data
}

getTodos().then((data) => { 
  console.log(data)
})

// var SUPABASE_URL = 'https://ernhobnpmmupjnmxpfbt.supabase.co'
// const SUPABASE_ANON_KEY =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxMzA5ODU0NCwiZXhwIjoxOTI4Njc0NTQ0fQ.Z9bRrfaL2oGhSuyBckFcdcnRIJDelWJ1II98OnEtLO0'

// const _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// async function loadData() {
//   const { data, error } = await _supabase
//     .from("farmas")
//     .select("email")
  
//   console.log(_supabase)
//   console.log("data")
//   console.log(data)
//   console.log("data2")
//   console.log(error)
// }

// loadData()