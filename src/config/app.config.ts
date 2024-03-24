import z from 'zod';

export default async () => {
  const envVariablesSchema = z.object({
    PORT: z.string().default('8080'),
    MONGODB_URI: z.string(),
    ENV: z.string().default('development'),
    JWT_SECRET: z.string(),
  });

  const envVariables = envVariablesSchema.parse(process.env);

  return {
    port: envVariables.PORT,
    mongoose: {
      uri: envVariables.MONGODB_URI,
      options: {},
    },
    env: envVariables.ENV,
    jwt: {
      secret: envVariables.JWT_SECRET,
    },
  };
};
