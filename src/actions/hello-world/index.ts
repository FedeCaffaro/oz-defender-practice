export async function handler(event: any) {
  console.log(`Hello world from serverless`);
  console.log(JSON.stringify(event));
  return `Hello world from serverless`;
}
