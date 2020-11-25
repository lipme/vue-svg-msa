#!/usr/bin/perl
my $nb = 1000;
print  "{\n";
print "\"seqs\":[\n";
for (my $i = 1; $i <=$nb ; $i++)
{
    print "{\n";
    print "   \"seq\":  \"ATCATCATCATCATCATACTCATTTTTACATCATCATCATACTACATGACGACGACAGCAGCCCTTACGACGATTTACGCGAGAACACTATCATCACAGACGAATTAGAGAGGGGGACAGAGGGACAGCAGCAGCCCAGACAGACGACCCGATTTATACTCATACTCACAGCATACGATGACACAGACGACGACAGCAGACGACGCATCATATACTCATTTTTACATCATCAAT\",\n";
    print "   \"id\": \"seq$i\",\n";
	print "   \"name\": \"seq$i\",\n";
	print "   \"color\": \"red\"\n";
	if ($i < $nb) {    
		print "},\n";
	} else { 
		print "}\n";
	}
}
 print "]";
 print "}\n";
    
