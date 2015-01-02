package com.homata.ukefruit;

import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;

import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        WebView  myWebView = (WebView)findViewById(R.id.webView1);
        //標準ブラウザをキャンセル
        myWebView.setWebViewClient(new WebViewClient());
        //アプリ起動時に読み込むURL
        myWebView.loadUrl("http://dev.openfab.jp/~homata/furit/index.html");
        //myWebView.loadUrl("file:///android_asset/index.html");

        // JavaScript有効
        myWebView.getSettings().setUseWideViewPort(true);
        myWebView.getSettings().setJavaScriptEnabled(true);

        // スライドバー無効
        myWebView.getSettings().setLoadWithOverviewMode(true);
        myWebView.setScrollBarStyle(WebView.SCROLLBARS_INSIDE_OVERLAY);
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
