import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const HelpCard = ({ icon, title, description, ctaLink, ctaText }) => {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">{icon}</div>
                    <div>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription className="mt-1">{description}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardFooter>
                <Button asChild variant="link" className="p-0 h-auto font-semibold">
                    <Link to={ctaLink}>{ctaText} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </CardFooter>
        </Card>
    );
};
