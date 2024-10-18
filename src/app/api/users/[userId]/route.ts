type RouteParams = {
  params: {
    userId: string;
  };
};

export const GET = (req: Request, { params }: RouteParams) => {
  return Response.json({ userId: params });
};
