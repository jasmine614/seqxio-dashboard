import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ContactCard = ({ onContact }) => {
    return (
        <Card>
            <CardContent className="p-6">
                <p className="mb-4 text-gray-600">Still need help? Our support team is here to assist you.</p>
                <div className="flex gap-4">
                    <Button onClick={onContact}>Contact support</Button>
                    <Button variant="secondary">Report a bug</Button>
                    <Button variant="secondary">Request a feature</Button>
                </div>
            </CardContent>
        </Card>
    );
};
