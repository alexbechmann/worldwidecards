export const routes = {
  designs: {
    path: '/designer/:id?',
    build: (id?: string) => `/designer/${id}`
  },
  myDesigns: {
    path: '/my-designs',
    build: () => `/my-designs`
  }
};
