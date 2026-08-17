'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { resourceSchema } from '@/schemas/resourceSchema';

export async function createResource(values: unknown) {
  const parsed = resourceSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? 'Please check the form values and try again.',
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      success: false,
      error: 'You must be logged in to create a resource.',
    };
  }

  const payload = parsed.data;

  const durationMinutes =
    payload.duration_minutes === undefined || payload.duration_minutes === ''
      ? null
      : Number(payload.duration_minutes);

  const { error } = await supabase.from('resources').insert({
    name: payload.name,
    description: payload.description,
    owner_id: user.id,
    type: payload.type,
    status: payload.status,
    duration_minutes: durationMinutes,
    skills: [],
  });

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  revalidatePath('/resources');
  return {
    success: true,
    message: 'Resource created successfully.',
  };
}
