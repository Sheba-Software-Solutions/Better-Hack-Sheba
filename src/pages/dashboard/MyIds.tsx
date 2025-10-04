import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { CreditCard, CheckCircle } from 'lucide-react';

interface ID {
  id: string;
  userId: string;
  type: string;
  idNumber: string;
  name: string;
  birthdate: string;
  verifiedAt: string;
}

const MyIds = () => {
  const { user } = useAuth();
  const [ids, setIds] = useState<ID[]>([]);

  useEffect(() => {
    if (user) {
      const storedIds = JSON.parse(localStorage.getItem('sheba-cred-ids') || '[]');
      const userIds = storedIds.filter((id: ID) => id.userId === user.id);
      setIds(userIds);
    }
  }, [user]);

  return (
    <div className="p-8">
      <div className="max-w-5xl">
        <h1 className="text-3xl font-bold mb-2 text-foreground">My IDs</h1>
        <p className="text-muted-foreground mb-8">
          Your verified identity documents
        </p>

        {ids.length === 0 ? (
          <Card className="p-12 text-center">
            <CreditCard className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-foreground">No Verified IDs Yet</h3>
            <p className="text-muted-foreground">
              Verify your National ID in the Profile section to get started.
            </p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {ids.map((id) => (
              <Card key={id.id} className="p-6 shadow-card hover:shadow-card-hover transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{id.type}</h3>
                      <p className="text-sm text-muted-foreground">ID: {id.idNumber}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-accent/10 text-accent">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>

                <div className="space-y-2 pt-4 border-t border-border">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Name:</span>
                    <span className="text-sm font-medium text-foreground">{id.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Birthdate:</span>
                    <span className="text-sm font-medium text-foreground">
                      {new Date(id.birthdate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Verified:</span>
                    <span className="text-sm font-medium text-foreground">
                      {new Date(id.verifiedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyIds;
