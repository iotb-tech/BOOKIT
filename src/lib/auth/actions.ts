'use server'

import { createClient } from '../supabase/server'

export async function signup(
  fullName: string,
  email: string,
  password: string
) {
  const supabase = await createClient()

  const cleanName = fullName.trim()
  const cleanEmail = email.trim().toLowerCase()

  if (!cleanName) {
    return {
      success: false,
      error: 'Full name is required.',
    }
  }

  if (!cleanEmail) {
    return {
      success: false,
      error: 'Email is required.',
    }
  }

  if (password.length < 8) {
    return {
      success: false,
      error: 'Password must be at least 8 characters.',
    }
  }

  const { data, error } =
    await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        data: {
          full_name: cleanName,
        },
      },
    })

  if (error) {
    return {
      success: false,
      error: error.message,
    }
  }

  return {
    success: true,
    user: data.user,
    session: data.session,
    message: data.session
      ? 'Account created successfully.'
      : 'Account created. Please check your email.',
  }
}

// login function
export async function login(
  email: string,
  password: string
) {
  const supabase = await createClient()

  const cleanEmail = email.trim().toLowerCase()

  if (!cleanEmail || !password) {
    return {
      success: false,
      error: 'Email and password are required.',
    }
  }

  const { data, error } =
    await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    })

  if (error) {
    return {
      success: false,
      error: error.message,
    }
  }

  return {
    success: true,
    user: data.user,
    session: data.session,
    message: 'Login successful.',
  }
}

// logout function
export async function logout() {
  const supabase = await createClient()

  const { error } =
    await supabase.auth.signOut()

  if (error) {
    return {
      success: false,
      error: error.message,
    }
  }

  return {
    success: true,
    message: 'Logged out successfully.',
  }
}

//  current user function

export async function getCurrentUser() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  return user
}

// current profile function

export async function getCurrentProfile() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: profile, error } =
    await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

  if (error) {
    return null
  }

  return profile
}

