import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const host = request.headers.get('host') || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const appBaseUrl = `${protocol}://${host}`;

  const aitXml = `<?xml version="1.0" encoding="UTF-8"?>
<mhp:ServiceDiscovery xmlns:mhp="urn:dvb:mhp:2009" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <!-- Application Information Table (AIT) for Radio Islas HbbTV Interactive TV -->
  <mhp:ApplicationDiscovery>
    <mhp:ApplicationList>
      <mhp:Application>
        <mhp:appName>Radio Islas HbbTV</mhp:appName>
        <mhp:applicationIdentifier>
          <mhp:orgId>0x000000FF</mhp:orgId>
          <mhp:appId>0x0001</mhp:appId>
        </mhp:applicationIdentifier>
        <mhp:applicationDescriptor>
          <mhp:type>
            <mhp:otherPattern>application/vnd.hbbtv.xhtml+xml</mhp:otherPattern>
          </mhp:type>
          <mhp:controlCode>AUTOSTART</mhp:controlCode>
          <mhp:visibility>VISIBLE_ALL</mhp:visibility>
          <mhp:serviceBound>true</mhp:serviceBound>
          <mhp:priority>1</mhp:priority>
          <mhp:version>1</mhp:version>
          <mhp:mhpVersion>
            <mhp:profile>1</mhp:profile>
            <mhp:versionMajor>1</mhp:versionMajor>
            <mhp:versionMinor>5</mhp:versionMinor>
            <mhp:versionMicro>1</mhp:versionMicro>
          </mhp:mhpVersion>
        </mhp:applicationDescriptor>
        <mhp:applicationLocation>${appBaseUrl}/index.html</mhp:applicationLocation>
        <mhp:applicationBoundary>
          <mhp:boundary>${appBaseUrl}</mhp:boundary>
        </mhp:applicationBoundary>
      </mhp:Application>
    </mhp:ApplicationList>
  </mhp:ApplicationDiscovery>
</mhp:ServiceDiscovery>`;

  return new NextResponse(aitXml, {
    status: 200,
    headers: {
      'Content-Type': 'application/vnd.hbbtv.ait+xml; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
