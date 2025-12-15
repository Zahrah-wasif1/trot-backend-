export function successResponse(data: any, status: number = 200) {
  return new Response(
    JSON.stringify({
      success: true,
      data,
    }),
    {
      status,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

export function errorResponse(message: string, status: number = 400) {
  return new Response(
    JSON.stringify({
      success: false,
      error: message,
    }),
    {
      status,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

export function handleError(error: any) {
  console.error('Error:', error);

  if (error instanceof Error) {
    if (error.message === 'Unauthorized') {
      return errorResponse(error.message, 401);
    }
    if (error.message.includes('Forbidden')) {
      return errorResponse(error.message, 403);
    }
    return errorResponse(error.message, 500);
  }

  return errorResponse('Internal server error', 500);
}

