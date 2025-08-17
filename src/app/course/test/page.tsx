import MainLayout from '@/components/layout/MainLayout';

export default function TestPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Test Route</h1>
        <p>This is a test to see if static routes work.</p>
      </div>
    </MainLayout>
  );
}