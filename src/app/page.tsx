import { HydrateClient } from "@/trpc/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Activity,
  Brain,
  Code,
  SparkleIcon,
  Sparkles,
} from "lucide-react";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col bg-background container mx-auto">
        {/* Hero Section */}
        <section className="container flex flex-col-reverse md:flex-row items-center justify-between py-20 gap-8">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Transform your body with Advanced AI Technology
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Experience the future of fitness with AI-powered, personalized
              workouts tailored to your unique goals and abilities. Your
              intelligent virtual trainer analyzes your form, tracks progress,
              and adapts in real-time to optimize your fitness journey. Get
              ready to transform your workout routine with cutting-edge
              technology that evolves with you.
            </p>
            <div className="flex gap-4">
              <Button size="lg">
                Generate your program
                <Sparkles className="text-yellow-400" />
              </Button>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src="/workout.svg"
              alt="AI Fitness Training"
              className="max-w-md w-full"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-20 space-y-12">
          <h2 className="text-3xl font-bold text-center">
            Powered by Advanced AI
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Brain className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Smart Workout Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  AI-powered workout plan that helps you hit your fitness goals
                  and targets
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Activity className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Real-time Form Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Advanced motion tracking to ensure perfect form and technique
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <LineChart className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Adaptive Programming</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Dynamic workouts based on your performance and recovery
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Progress Tracking Section */}
        <section className="container py-20 bg-muted/50">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-3xl font-bold text-center">
              Track Your Progress
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">
                      Progress Chart Placeholder
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Daily Steps</span>
                      <span className="font-bold">8,547</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Heart Rate</span>
                      <span className="font-bold">142 BPM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Calories Burned</span>
                      <span className="font-bold">577</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* AI Coach Section */}
        <section className="container py-20">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-bold">Your Personal AI Coach</h2>
              <p className="text-lg text-muted-foreground">
                Get real-time feedback and personalized recommendations from
                your AI coach. Track your progress and stay motivated with
                data-driven insights.
              </p>
              <Button size="lg">Start Training Now</Button>
            </div>
            <div className="flex-1">
              <Card className="bg-black text-white overflow-hidden">
                <CardContent className="p-6">
                  <Code className="w-8 h-8 mb-4" />
                  <pre className="font-mono text-sm overflow-x-auto">
                    <code>{`// AI Coach Recommendation
const workout = {
  type: "HIIT",
  duration: "30 mins",
  intensity: "high",
  exercises: [
    "burpees",
    "mountain climbers",
    "jump squats"
  ]
};`}</code>
                  </pre>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </HydrateClient>
  );
}
