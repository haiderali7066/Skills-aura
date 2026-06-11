import { NextResponse } from 'next/server';

export const ApiResponse = {
  success: (data: any, message = 'Success', status = 200) => {
    return NextResponse.json(
      {
        success: true,
        message,
        data,
      },
      { status }
    );
  },

  error: (message = 'Error', status = 400, errors?: any) => {
    return NextResponse.json(
      {
        success: false,
        message,
        errors,
      },
      { status }
    );
  },

  unauthorized: (message = 'Unauthorized') => {
    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 401 }
    );
  },

  forbidden: (message = 'Forbidden') => {
    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 403 }
    );
  },

  notFound: (message = 'Not found') => {
    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 404 }
    );
  },

  validation: (errors: Record<string, string>) => {
    return NextResponse.json(
      {
        success: false,
        message: 'Validation failed',
        errors,
      },
      { status: 422 }
    );
  },

  serverError: (message = 'Internal server error', error?: any) => {
    console.error('[API Error]', error);
    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 500 }
    );
  },
};

export async function validateRequest(
  request: Request,
  required: string[] = []
) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    return { valid: false, error: ApiResponse.unauthorized() };
  }

  try {
    const body = await request.json();
    const missingFields = required.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      const errors = missingFields.reduce((acc, field) => {
        acc[field] = `${field} is required`;
        return acc;
      }, {} as Record<string, string>);

      return { valid: false, error: ApiResponse.validation(errors) };
    }

    return {
      valid: true,
      token: authHeader.replace('Bearer ', ''),
      body,
    };
  } catch (error) {
    return {
      valid: false,
      error: ApiResponse.error('Invalid request body'),
    };
  }
}

export function getSupabaseClient() {
  const { createClient } = require('@supabase/supabase-js');

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    return null;
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}
