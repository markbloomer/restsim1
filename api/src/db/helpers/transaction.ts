// Placeholder for transaction helper

export async function runInTransaction(prisma: any, fn: Function) {
  return await prisma.$transaction(async (tx: any) => {
    return await fn(tx);
  });
}