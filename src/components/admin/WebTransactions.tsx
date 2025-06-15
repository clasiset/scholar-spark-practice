
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Activity,
  Eye,
  Users,
  BookOpen,
  FileText,
  Calendar,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface WebTransaction {
  id: string;
  transaction_type: string;
  user_id: string | null;
  question_id: string | null;
  exam_type: string | null;
  subject: string | null;
  session_id: string | null;
  ip_address: string | null;
  user_agent: string | null;
  page_url: string | null;
  referrer: string | null;
  metadata: any;
  created_at: string;
}

const getTransactionIcon = (type: string) => {
  switch (type) {
    case 'question_view':
      return <Eye className="h-4 w-4" />;
    case 'question_created':
      return <FileText className="h-4 w-4" />;
    case 'exam_start':
      return <BookOpen className="h-4 w-4" />;
    case 'user_registration':
      return <Users className="h-4 w-4" />;
    default:
      return <Activity className="h-4 w-4" />;
  }
};

const getTransactionColor = (type: string) => {
  switch (type) {
    case 'question_view':
      return 'bg-blue-100 text-blue-800';
    case 'question_created':
      return 'bg-green-100 text-green-800';
    case 'exam_start':
      return 'bg-purple-100 text-purple-800';
    case 'user_registration':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const WebTransactions = () => {
  const [transactions, setTransactions] = useState<WebTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('web_transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (filter !== 'all') {
        query = query.eq('transaction_type', filter);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching transactions:', error);
        return;
      }

      // Transform the data to match our interface
      const transformedData: WebTransaction[] = (data || []).map(item => ({
        id: item.id,
        transaction_type: item.transaction_type,
        user_id: item.user_id,
        question_id: item.question_id,
        exam_type: item.exam_type,
        subject: item.subject,
        session_id: item.session_id,
        ip_address: item.ip_address as string | null,
        user_agent: item.user_agent,
        page_url: item.page_url,
        referrer: item.referrer,
        metadata: item.metadata,
        created_at: item.created_at
      }));

      setTransactions(transformedData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filter]);

  const transactionTypes = [
    { value: 'all', label: 'All Transactions' },
    { value: 'question_view', label: 'Question Views' },
    { value: 'question_created', label: 'Questions Created' },
    { value: 'exam_start', label: 'Exam Starts' },
    { value: 'user_registration', label: 'User Registrations' },
  ];

  const getTransactionCounts = () => {
    const counts = transactions.reduce((acc, transaction) => {
      acc[transaction.transaction_type] = (acc[transaction.transaction_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: transactions.length,
      question_views: counts.question_view || 0,
      questions_created: counts.question_created || 0,
      exam_starts: counts.exam_start || 0,
      user_registrations: counts.user_registration || 0,
    };
  };

  const counts = getTransactionCounts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Web Transactions</h2>
          <p className="text-slate-600 dark:text-slate-400">Real-time activity monitoring from Zehulu.com</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={fetchTransactions} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{counts.total}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Question Views</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{counts.question_views}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Questions Created</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{counts.questions_created}</p>
              </div>
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Exam Starts</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{counts.exam_starts}</p>
              </div>
              <BookOpen className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Registrations</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{counts.user_registrations}</p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Transactions
              </CardTitle>
              <CardDescription>Latest activity from the main website</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-500" />
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-md text-sm bg-white dark:bg-slate-800"
              >
                {transactionTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <RefreshCw className="h-6 w-6 animate-spin text-slate-400" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Session</TableHead>
                  <TableHead>Page</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTransactionIcon(transaction.transaction_type)}
                        <Badge className={getTransactionColor(transaction.transaction_type)}>
                          {transaction.transaction_type.replace('_', ' ')}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {transaction.exam_type && (
                          <p className="text-sm font-medium">{transaction.exam_type}</p>
                        )}
                        {transaction.subject && (
                          <p className="text-xs text-slate-500">{transaction.subject}</p>
                        )}
                        {transaction.metadata?.question_id && (
                          <p className="text-xs text-slate-400">ID: {transaction.metadata.question_id.slice(0, 8)}...</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(transaction.created_at), 'MMM dd, HH:mm')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-xs text-slate-500 font-mono">
                        {transaction.session_id?.slice(0, 8) || 'anonymous'}...
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="text-xs text-slate-500 truncate max-w-32">
                        {transaction.page_url?.split('/').pop() || 'N/A'}
                      </p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          
          {!loading && transactions.length === 0 && (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400">
              No transactions found for the selected filter.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WebTransactions;
