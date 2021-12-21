export class Err {
  isError = true;
  message = "";

  constructor(msg?: string) {
    if (msg) this.message = msg;
  }
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const isPending = (p: Promise<any>) => {
  let resolved = false;
  let rejected = false;

  p.then(() => {
    resolved = true;
  }).catch(() => {
    rejected = true;
  });

  return sleep(1)
    .then(() => {
      return !resolved && !rejected;
    })
    .catch(() => {});
};

export const Catch = <T = Promise<any>>(p: () => void): T | undefined => {
  try {
    p();
    return undefined;
  } catch (e) {
    return e as T;
  }
};
