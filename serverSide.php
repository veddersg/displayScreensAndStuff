<?php

//Server side code for what's inevitably going to end up becoming a web app, I guess
//At this point, this is primarily going to be handling our autoscroll functionality that
//we'll want for this thing

require 'vendor/autoload.php';

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

$proxyURL = 'http://localhost:6969/proxy.php?url='; //based on the hardcoded examples from GPT, this should be the first part we need
//we'll essentially be injecting this + the splunk report URL. This ~should be able to bypass the XSS restrictions we get to implement autoscroll

$client = new Client();

/*Functions*/

//So yeah, this function is meant to push the proxied URL's to the client-side so that
//we can get some autoscroll functionality going here
function generateURL($id) {
  //In theory, we should be able to concat these with the base URL to get our desired result
  //Though we'll definitely have to write some tertiary documentation saying to add/modify
  // URL's here if we want them to autoscroll while hardcoding is fine/preferred for ones that
  //don't need autoscrolling
  $iframeURLMap = [
    'lockedAccountsList1' => 'https://splunk-sh1.server.gvsu.edu:8000/en-US/embed?s=%2FservicesNS%2Fs_gairsonq-admin%2Fsearch%2Fsaved%2Fsearches%2FOkta_Locked_Accounts_Gairson&oid=v%5EkTBHXS59VldKXKFJkRSanogwRJ%5ECiz8oJrYueMNTlqu0hjyUoB%5ENsnRDgSz1Ma%5E03QhcgXbgrz2RutngEpU3ezjXrzeK3giamQVcPJbm03fcyIMhYyoJbAfB9CViUKbQgdtpvoYxAZvU9N9Axrw4iNQpLet%5EfutT0eB4blpIdA2L3ehvL6ZxC5tN',
    'successfulLoginsOutsideUS' => 'https://splunk-sh1.server.gvsu.edu:8000/en-US/embed?s=%2FservicesNS%2Fs_gairsonq-admin%2Fsearch%2Fsaved%2Fsearches%2FOkta%2520Success&oid=HjE3%5EuUEQzUyKp%5EKWWW7Dt5RDQI2AY9fL%5EVj9fucOsEsUuJQ7TKGmgeNl_rWf_j3USMRp86SGJHqVmT08GOojfulcb0cYmGwctY2ugP87fXVLFYhfKMzu5kiBhQAvpmqMxKEmNa6Et8m3Pmyb4D4npbRTqcson8hkKn7G3L',
    'officeFirewallAllowedThreats' => 'https://splunk-sh1.server.gvsu.edu:8000/en-US/embed?s=%2FservicesNS%2Fs_winebadd-admin%2Fsearch%2Fsaved%2Fsearches%2FGV%2520Office%2520Firewall%2520Allowed%2520Threats%2520Modified.&oid=4hFjg9OP8HxMEFQy1rKMM9jO93RhdEyPZYTUGEFTAqzglieTQgH5F9JMvJXamry68YtLtPLTtLPjU8M2uZ22TKBiapevhatsmY93vO2_UejRxj3VLmWQpBfoDIJo%5EbXXTSZYx2UUgd6IOWrmnUJQ7sUL_kSQLobPxD7TvG3Xv8guXhp09Z9EFchzmWzpR%5EZTWjfTuMPwo8R',
    'possiblePortScanList1' => 'https://splunk-sh1.server.gvsu.edu:8000/en-US/embed?s=%2FservicesNS%2Fnobody%2FInfoSec_App_for_Splunk%2Fsaved%2Fsearches%2FPossible%2520Port%2520Scan%2520Report&oid=XvAMs3mgURSfuIv%5Etsu_5VclLIERLXxtM2sbSyxOWJ3X0TklML%5EzlOmQ%5E5VdmArhLpf4lOGIugaOBVqEM75qASAyj0KoJBe9c3QEcfzE_N8tH3gDvJ3Kv1muR_TdIcAbP%5Eb0Nu_W8XzS6sJe_W3aQs%5EXaNsCJP%5EFDUG3hnEOfPpJMbRLBqf2xF_JcW_8_eyH61N'
  ];

  if(array_key_exists($id, $iframeURLMap)) {
    return 'http://localhost:6969/serverSide.php?action=proxy&url='.$iframeURLMap[$id];
  } else {
    return null;
  }

}

//This function is needed in order for the server to be able to handle the proxied URL
// requests that will be coming through to load the splunk reports in such a way that we
//can tweak them to autoscroll. We're basically tricking the XSS security measures into thinking
//these things originated from us. I wonder if that's bad practice.
function handleProxyRequest($reportURL) {
  $client = new Client();

  try {
    $response = $client->request('GET', urldecode($reportURL));
    header('Content-Type: '.$response->getHeader('Content-Type')[0]);
    echo $response->getBody();
  } catch (RequestException $e) {
    echo 'Error: $e->getMessage()';
  }
}

/*Driver Code*/

//AJAX Request Handling
$action = $_GET['action'] ?? null;

switch ($action) {
  case 'generateURL':
    //this will allow us to push the URLs we'll need for those stupid iframe reports
    if (isset($_GET['id'])) {
      $url = generateURL($_GET['id']);
      header('Content-Type: application/json');
      echo json_encode($url);
    } else {
      header('Content-Type: application/json');
      echo json_encode(['error' => 'Something went wrong']);
    }
    break;
  case 'proxy':
    $reportURL = $_GET['url'] ?? null;
    if ($reportURL) {
      handleProxyRequest($reportURL);
    } else {
      echo 'No URL Specified';
    }
    break;
  default:
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Unknown Action']);
}

?>
